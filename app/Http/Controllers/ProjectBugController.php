<?php

namespace App\Http\Controllers;

use App\Http\Resources\BugResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class ProjectBugController extends Controller
{
    public function index(Project $project, Request $request): AnonymousResourceCollection
    {
        Gate::authorize('view', $project);

        $bugs = $project->bugs()->orderBy('title')->paginate(15);

        return BugResource::collection($bugs);
    }
}
