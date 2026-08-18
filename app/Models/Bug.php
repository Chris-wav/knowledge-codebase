<?php

namespace App\Models;

use App\Enums\BugStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bug extends Model
{
    protected $table = 'bug';

    protected $fillable = [
        'title',
        'error_message',
        'description',
        'cause',
        'solution',
        'status',
        'project_name',
        'technology',
    ];

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class)->withTimestamps();
    }

    protected function casts(): array
    {
        return [
            'status' => BugStatus::class,
        ];
    }
}
