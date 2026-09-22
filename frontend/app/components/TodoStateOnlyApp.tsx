'use client';

import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Todo } from '@/types/todo';

type TodoStateOnlyAppProps = {
  initialTodos: Todo[];
};

export default function TodoStateOnlyApp({ initialTodos }: TodoStateOnlyAppProps) {
  // Deklarasi inisialisasi state utama (RAM in-memory)
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // 1. Handler Tambah Tugas Baru
  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description: 'Tugas baru yang ditambahkan ke state komponen.',
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    // Memasukkan tugas baru ke urutan paling atas
    setTodos((prev) => [newTodo, ...prev]);
  };

  // 2. Handler Checklist / Toggle Status Completed
  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 3. Handler Hapus Tugas
  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      {/* Form Input */}
      <TodoForm onAddTodo={handleAddTodo} />

      {/* List Tugas */}
      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}