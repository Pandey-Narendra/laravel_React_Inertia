<?php

namespace App\Console\Commands;
use Illuminate\Support\Facades\Hash;
use Illuminate\Console\Command;
use App\Models\User;
class ImportData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'insert dummy user and admin data';

    
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $data = [
            ["name" => "admin", "email" => "admin@gmail.com", "password" => Hash::make('admin@123'), "role" => "admin"],
            ["name" => "user", "email" => "user@gmail.com", "password" => Hash::make('user@123'), "role" => "user"],
        ];

        foreach ($data as $item) {
            User::create([
                'name' => $item['name'],
                'email' => $item['email'],
                'password' => $item['password'],
                'role' => $item['role'],
            ]);
        }
    }
}
