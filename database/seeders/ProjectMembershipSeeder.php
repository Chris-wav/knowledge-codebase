<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectMembershipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'test@example.com')->firstOrFail();
        $projects = Project::all();

        foreach ($projects as $project) {
            $user->projects()->syncWithoutDetaching([
                $project->id => ['role' => 'owner'],
            ]);
        }
    }
}
