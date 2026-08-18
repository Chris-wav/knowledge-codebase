<?php

namespace App\Http\Requests;

use App\Enums\BugStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBugRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'error_message' => ['sometimes', 'nullable', 'string'],
            'description' => ['sometimes', 'nullable', 'string'],
            'cause' => ['sometimes', 'nullable', 'string'],
            'solution' => ['sometimes', 'nullable', 'string'],
            'status' => ['sometimes', 'required', 'string', Rule::enum(BugStatus::class)],
            'project_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'technology' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
}
