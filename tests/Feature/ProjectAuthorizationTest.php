<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    private Project $project;

    private User $owner;

    private User $member;

    private User $nonMember;

    protected function setUp(): void
    {
        parent::setUp();

        $this->owner = User::factory()->create();
        $this->member = User::factory()->create();
        $this->nonMember = User::factory()->create();

        $this->project = Project::create([
            'name' => 'Authorization Project',
            'description' => 'Project used to verify authorization.',
            'slug' => 'authorization-project',
        ]);

        $this->project->users()->attach([
            $this->owner->id => ['role' => 'owner'],
            $this->member->id => ['role' => 'member'],
        ]);
    }

    public function test_owner_can_view_and_update_project(): void
    {
        $this->actingAs($this->owner)
            ->getJson($this->projectEndpoint())
            ->assertOk();

        $this->actingAs($this->owner)
            ->patchJson($this->projectEndpoint(), [
                'description' => 'Updated by the owner.',
            ])
            ->assertOk();

        $this->assertDatabaseHas('projects', [
            'id' => $this->project->id,
            'description' => 'Updated by the owner.',
        ]);
    }

    public function test_member_can_view_but_cannot_update_project(): void
    {
        $this->actingAs($this->member)
            ->getJson($this->projectEndpoint())
            ->assertOk();

        $this->actingAs($this->member)
            ->patchJson($this->projectEndpoint(), [
                'description' => 'Attempted by a member.',
            ])
            ->assertForbidden();
    }

    public function test_non_member_cannot_view_or_update_project(): void
    {
        $this->actingAs($this->nonMember)
            ->getJson($this->projectEndpoint())
            ->assertForbidden();

        $this->actingAs($this->nonMember)
            ->patchJson($this->projectEndpoint(), [
                'description' => 'Attempted by an outsider.',
            ])
            ->assertForbidden();
    }

    public function test_guest_cannot_view_or_update_project(): void
    {
        $this->getJson($this->projectEndpoint())
            ->assertUnauthorized();

        $this->patchJson($this->projectEndpoint(), [
            'description' => 'Attempted by a guest.',
        ])->assertUnauthorized();
    }

    public function test_project_index_only_returns_projects_for_authenticated_user(): void
    {
        $otherProject = Project::create([
            'name' => 'Other Project',
            'description' => 'Not related to the owner.',
            'slug' => 'other-project',
        ]);

        $this->actingAs($this->owner)
            ->getJson('/api/projects')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $this->project->id)
            ->assertJsonMissing(['id' => $otherProject->id]);
    }

    private function projectEndpoint(): string
    {
        return '/api/projects/'.$this->project->slug;
    }
}
