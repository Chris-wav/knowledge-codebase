<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BugResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'error_message' => $this->error_message,
            'description' => $this->description,
            'cause' => $this->cause,
            'solution' => $this->solution,
            'status' => $this->status,
            'project_name' => $this->project_name,
            'technology' => $this->technology,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
