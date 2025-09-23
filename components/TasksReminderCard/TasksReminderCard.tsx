'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import axios from 'axios';
import styles from './TasksReminderCard.module.css';
import { Task, TasksReminderCardProps } from '@/types/task';

// API базовий URL
const API_BASE_URL = 'https://beckend-project-stork.onrender.com';

// API функції
const taskApi = {
  // Отримання списку завдань
  getTasks: async (): Promise<Task[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tasks`);
      return response.data;
    } catch (error) {
      console.error('Помилка отримання завдань:', error);
      return [];
    }
  },

  // Створення нового завдання
  createTask: async (title: string): Promise<Task | null> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/tasks`, {
        title,
        completed: false,
      });
      return response.data;
    } catch (error) {
      console.error('Помилка створення завдання:', error);
      return null;
    }
  },

  // Оновлення статусу завдання
  updateTaskStatus: async (id: string, completed: boolean): Promise<boolean> => {
    try {
      await axios.patch(`${API_BASE_URL}/api/tasks/${id}`, {
        completed,
      });
      return true;
    } catch (error) {
      console.error('Помилка оновлення завдання:', error);
      return false;
    }
  },
};

const TasksReminderCard: React.FC<TasksReminderCardProps> = ({ className = '' }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Завантаження завдань при монтуванні компонента
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    const fetchedTasks = await taskApi.getTasks();
    setTasks(fetchedTasks);
    setIsLoading(false);
  };

  // Обробка додавання нового завдання
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    const newTask = await taskApi.createTask(newTaskTitle.trim());
    if (newTask) {
      setTasks(prev => [...prev, newTask]);
      setNewTaskTitle('');
      setShowAddModal(false);
    }
  };

  // Обробка зміни статусу завдання
  const handleToggleTask = async (taskId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const success = await taskApi.updateTaskStatus(taskId, newStatus);

    if (success) {
      setTasks(prev =>
        prev.map(task => (task._id === taskId ? { ...task, isDone: newStatus } : task))
      );
    }
  };

  return (
    <div className={`${styles.tasksReminderCard} ${className}`}>
      {/* Заголовок */}
      <div className={styles.header}>
        <h2 className={styles.title}>Важливі завдання</h2>

        {/* Кнопка додавання */}
        <button
          onClick={() => setShowAddModal(true)}
          className={styles.addButton}
          aria-label="Додати нове завдання"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Список завдань */}
      <div className={styles.tasksList}>
        {isLoading ? (
          <div className={styles.loading}>Завантаження...</div>
        ) : tasks.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>Наразі немає жодних завдань</p>
            <p className={styles.emptyText}>Створіть мершій нове завдання!</p>
            <button onClick={() => setShowAddModal(true)} className={styles.createFirstButton}>
              Створити завдання
            </button>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task._id} className={styles.taskItem}>
              {/* Чекбокс */}
              <button
                onClick={() => handleToggleTask(task._id, task.isDone)}
                className={`${styles.checkbox} ${task.isDone ? styles.completed : ''}`}
                aria-label={task.isDone ? 'Позначити як невиконане' : 'Позначити як виконане'}
              >
                {task.isDone && <Check size={12} color="white" />}
              </button>

              {/* Текст завдання */}
              <span className={`${styles.taskText} ${task.isDone ? styles.completed : ''}`}>
                {task.name}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Модальне вікно для додавання завдання */}
      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Додати нове завдання</h3>

            <input
              type="text"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              placeholder="Введіть назву завдання..."
              className={styles.input}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleAddTask();
                }
              }}
              autoFocus
            />

            <div className={styles.modalActions}>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewTaskTitle('');
                }}
                className={styles.cancelButton}
              >
                Скасувати
              </button>

              <button
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim()}
                className={styles.confirmButton}
              >
                Додати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksReminderCard;
