<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
            ],
        );

        Project::query()->firstOrCreate(
            ['slug' => 'bugvault-api'],
            [
                'name' => 'BugVault API',
                'description' => 'Internal company bug knowledge base.',
            ],
        );

        $this->call(BugSeeder::class);
        $this->call(ProjectMembershipSeeder::class);
    }
}
