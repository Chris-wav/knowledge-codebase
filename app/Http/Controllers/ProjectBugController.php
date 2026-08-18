<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexProjectBugRequest;
use App\Http\Requests\StoreBugRequest;
use App\Http\Resources\BugResource;
use App\Models\Bug;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class ProjectBugController extends Controller
{
    public function index(Project $project, IndexProjectBugRequest $request): AnonymousResourceCollection
    {
        Gate::authorize('view', $project);

        $search = $request->validated('search');
        $query = $project->bugs();
        $status = $request->validated('status');

        if ($status) {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where('title', 'like', '%'.$search.'%');
        }
        $bugs = $query->orderBy('title')->paginate(15)->withQueryString();

        return BugResource::collection($bugs);
    }

    public function store(Project $project, StoreBugRequest $request): JsonResponse
    {
        Gate::authorize('createBug', $project);
        $bugData = $request->validated();

        $bug = DB::transaction(function () use ($project, $bugData) {
            $bug = $project->bugs()->create($bugData);

            return $bug;
        });

        return new BugResource($bug)
            ->response()
            ->setStatusCode(201);
    }

    public function show(Project $project, Bug $bug): BugResource
    {
        Gate::authorize('view', $project);

        $projectBug = $project->bugs()->whereKey($bug->id)->firstOrFail();

        return new BugResource($projectBug);
    }
}
