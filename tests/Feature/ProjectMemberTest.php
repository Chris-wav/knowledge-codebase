<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectMemberTest extends TestCase
{
    use RefreshDatabase;

    private Project $project;

    private User $owner;

    private User $member;

    private User $otherMember;

    private User $nonMember;

    protected function setUp(): void
    {
        parent::setUp();

        $this->owner = User::factory()->create(['name' => 'Owner User']);
        $this->member = User::factory()->create(['name' => 'Member User']);
        $this->otherMember = User::factory()->create(['name' => 'Another Member']);
        $this->nonMember = User::factory()->create(['name' => 'Outside User']);

        $this->project = Project::create([
            'name' => 'Membership Project',
            'description' => 'Project used to verify memberships.',
            'slug' => 'membership-project',
        ]);

        $this->project->users()->attach([
            $this->owner->id => ['role' => 'owner'],
            $this->member->id => ['role' => 'member'],
            $this->otherMember->id => ['role' => 'member'],
        ]);
    }

    public function test_owner_can_add_existing_user_as_member(): void
    {
        $candidate = User::factory()->create();

        $this->actingAs($this->owner)
            ->postJson($this->membersEndpoint(), [
                'email' => $candidate->email,
            ])
            ->assertCreated();

        $this->assertDatabaseHas('project_user', [
            'project_id' => $this->project->id,
            'user_id' => $candidate->id,
            'role' => 'member',
        ]);
    }

    public function test_existing_member_returns_conflict(): void
    {
        $this->actingAs($this->owner)
            ->postJson($this->membersEndpoint(), [
                'email' => $this->member->email,
            ])
            ->assertConflict();
    }

    public function test_existing_owner_returns_conflict_and_remains_owner(): void
    {
        $this->actingAs($this->owner)
            ->postJson($this->membersEndpoint(), [
                'email' => $this->owner->email,
            ])
            ->assertConflict();

        $this->assertDatabaseHas('project_user', [
            'project_id' => $this->project->id,
            'user_id' => $this->owner->id,
            'role' => 'owner',
        ]);
    }

    public function test_unknown_email_fails_validation(): void
    {
        $this->actingAs($this->owner)
            ->postJson($this->membersEndpoint(), [
                'email' => 'missing@example.com',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('email');
    }

    public function test_member_and_non_member_cannot_add_members(): void
    {
        $candidate = User::factory()->create();

        $this->actingAs($this->member)
            ->postJson($this->membersEndpoint(), [
                'email' => $candidate->email,
            ])
            ->assertForbidden();

        $this->actingAs($this->nonMember)
            ->postJson($this->membersEndpoint(), [
                'email' => $candidate->email,
            ])
            ->assertForbidden();
    }

    public function test_owner_and_member_can_view_paginated_members_with_roles(): void
    {
        $ownerResponse = $this->actingAs($this->owner)
            ->getJson($this->membersEndpoint())
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'email', 'role'],
                ],
                'links',
                'meta',
            ]);

        $members = collect($ownerResponse->json('data'));

        $this->assertSame('owner', $members->firstWhere('id', $this->owner->id)['role']);
        $this->assertSame('member', $members->firstWhere('id', $this->member->id)['role']);

        $this->actingAs($this->member)
            ->getJson($this->membersEndpoint())
            ->assertOk()
            ->assertJsonCount(3, 'data');
    }

    public function test_non_member_and_guest_cannot_view_members(): void
    {
        $this->actingAs($this->nonMember)
            ->getJson($this->membersEndpoint())
            ->assertForbidden();

        $this->app['auth']->forgetGuards();

        $this->getJson($this->membersEndpoint())
            ->assertUnauthorized();
    }

    public function test_owner_removes_only_target_member(): void
    {
        $this->actingAs($this->owner)
            ->deleteJson($this->memberEndpoint($this->member))
            ->assertNoContent();

        $this->assertDatabaseMissing('project_user', [
            'project_id' => $this->project->id,
            'user_id' => $this->member->id,
        ]);
        $this->assertDatabaseHas('project_user', [
            'project_id' => $this->project->id,
            'user_id' => $this->owner->id,
            'role' => 'owner',
        ]);
        $this->assertDatabaseHas('project_user', [
            'project_id' => $this->project->id,
            'user_id' => $this->otherMember->id,
            'role' => 'member',
        ]);
    }

    public function test_owner_cannot_be_removed(): void
    {
        $this->actingAs($this->owner)
            ->deleteJson($this->memberEndpoint($this->owner))
            ->assertConflict();

        $this->assertDatabaseHas('project_user', [
            'project_id' => $this->project->id,
            'user_id' => $this->owner->id,
            'role' => 'owner',
        ]);
    }

    public function test_removing_user_without_membership_returns_not_found(): void
    {
        $this->actingAs($this->owner)
            ->deleteJson($this->memberEndpoint($this->nonMember))
            ->assertNotFound();
    }

    public function test_member_non_member_and_guest_cannot_remove_members(): void
    {
        $this->actingAs($this->member)
            ->deleteJson($this->memberEndpoint($this->otherMember))
            ->assertForbidden();

        $this->actingAs($this->nonMember)
            ->deleteJson($this->memberEndpoint($this->otherMember))
            ->assertForbidden();

        $this->app['auth']->forgetGuards();

        $this->deleteJson($this->memberEndpoint($this->otherMember))
            ->assertUnauthorized();
    }

    private function membersEndpoint(): string
    {
        return '/api/projects/'.$this->project->slug.'/members';
    }

    private function memberEndpoint(User $user): string
    {
        return $this->membersEndpoint().'/'.$user->id;
    }
}
