<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectMemberRequest;
use App\Http\Resources\ProjectMemberResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class ProjectMemberController extends Controller
{
    /**
     * Add an existing user to the project as a member.
     */
    public function store(StoreProjectMemberRequest $request, Project $project): JsonResponse
    {
        $validated = $request->validated();
        $email = $validated['email'];

        $user = User::where('email', $email)->firstOrFail();

        $alreadyMember = $project->users()->whereKey($user->id)->exists();

        if ($alreadyMember) {
            return response()->json([
                'message' => 'This user is already a project member.',
            ], 409);
        }

        $project->users()->attach($user->id, [
            'role' => 'member',
        ]);

        return response()->json([
            'message' => 'User has been added to the project.',
        ], 201);
    }

    public function index(Project $project): AnonymousResourceCollection
    {
        Gate::authorize('view', $project);

        $users = $project
            ->users()
            ->orderBy('name')
            ->paginate(15);

        return ProjectMemberResource::collection($users);
    }

    public function destroy(Project $project, User $user)
    {
        Gate::authorize('manageMembers', $project);
        $targetUser = $project->users()->whereKey($user->id)->firstOrFail();
        if ($targetUser->pivot->role == 'owner') {
            return response()->json([
                'message' => 'You can not delete an owner of the project',
            ], 409);
        }
        $project->users()->detach($user->id);

        return response()->noContent();
    }
}
