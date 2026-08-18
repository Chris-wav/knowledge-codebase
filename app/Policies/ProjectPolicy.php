<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project): bool
    {
        return $project->users()->whereKey($user->id)->exists();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project): bool
    {
        return $this->isOwner($user, $project);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project): bool
    {
        return $this->isOwner($user, $project);
    }

    public function manageMembers(User $user, Project $project): bool
    {
        return $this->isOwner($user, $project);
    }

    /**
     * Determine whether the user doing the request
     * exists in the project
     * and is owner
     */
    private function isOwner(User $user, Project $project): bool
    {
        return $project
            ->users()
            ->whereKey($user->id)
            ->wherePivot('role', 'owner')
            ->exists();
    }

    private function isPartOfTheProject(User $user, Project $project)
    {
        return $project->users()->whereKey($user->id)->exists();
    }

    /**
     * Determine if the user is part of the project and can create a bug.
     */
    public function createBug(User $user, Project $project): bool
    {
        return $this->isPartOfTheProject($user, $project);
    }

    public function updateBug(User $user, Project $project): bool
    {
        return $this->isPartOfTheProject($user, $project);
    }
}
