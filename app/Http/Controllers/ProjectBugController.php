<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexProjectBugRequest;
use App\Http\Resources\BugResource;
use App\Models\Project;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class ProjectBugController extends Controller
{
    public function index(Project $project, IndexProjectBugRequest $request): AnonymousResourceCollection
    {
        Gate::authorize('view', $project);

        $search = $request->validated('search');
        $query = $project->bugs();

        if ($search) {
            $query->where('title', 'like', '%'.$search.'%');
        }
        $bugs = $query->orderBy('title')->paginate(15)->withQueryString();

        return BugResource::collection($bugs);
    }
}
