<?php

namespace Database\Seeders;

use App\Models\Bug;
use Illuminate\Database\Seeder;

class BugSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $bugRecords = [
            [
                'title' => 'Login returns server error',
                'error_message' => 'SQLSTATE[23000]: Integrity constraint violation',
                'description' => 'The login request fails for users with an existing session.',
                'cause' => 'A duplicate session token is inserted into the database.',
                'solution' => 'Update the existing session instead of creating a new one.',
                'status' => 'resolved',
                'project_name' => 'BugVault API',
                'technology' => 'Laravel',
            ],
            [
                'title' => 'Validation errors are not returned',
                'error_message' => null,
                'description' => 'Invalid bug data returns a generic 500 response.',
                'cause' => 'The validation exception is caught by a generic exception handler.',
                'solution' => 'Return validation errors with HTTP status 422.',
                'status' => 'open',
                'project_name' => 'BugVault API',
                'technology' => 'PHP',
            ],
            [
                'title' => 'Bug list loads slowly',
                'error_message' => null,
                'description' => 'Loading the bug list becomes slow when it contains many records.',
                'cause' => 'The endpoint returns every record without pagination.',
                'solution' => 'Paginate the query and add indexes for frequently filtered columns.',
                'status' => 'in_progress',
                'project_name' => 'BugVault API',
                'technology' => 'SQLite',
            ],
            [
                'title' => 'Missing project name in response',
                'error_message' => null,
                'description' => 'The project name is missing from serialized bug responses.',
                'cause' => 'The field is not included in the API resource.',
                'solution' => 'Add project_name to the bug resource response.',
                'status' => 'open',
                'project_name' => 'BugVault API',
                'technology' => 'Laravel API Resources',
            ],
            [
                'title' => 'Deleted bug remains in cache',
                'error_message' => null,
                'description' => 'A deleted bug continues to appear until the cache expires.',
                'cause' => 'The cache key is not cleared after deletion.',
                'solution' => 'Invalidate the bug list cache after deleting a record.',
                'status' => 'resolved',
                'project_name' => 'BugVault API',
                'technology' => 'Laravel Cache',
            ],
        ];

        foreach ($bugRecords as $bug) {
            Bug::updateOrCreate(
                ['title' => $bug['title']],
                $bug,
            );
        }
    }
}
