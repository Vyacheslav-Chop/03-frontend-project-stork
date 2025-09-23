'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import axios from 'axios';

// Типи даних
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
}

interface TasksReminderCardProps {
  className?: string;
}

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
        prev.map(task => (task.id === taskId ? { ...task, completed: newStatus } : task))
      );
    }
  };

  return (
    <div
      className={`tasks-reminder-card ${className}`}
      style={{
        width: '390px',
        height: '498px',
        background: '#fff4f6',
        borderRadius: '32px',
        border: '0px solid rgba(0, 0, 0, 0.15)',
        padding: '24px',
        fontFamily: '"Lato", sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: 1.6,
        color: '#000',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Заголовок */}
      <div style={{ marginBottom: '16px' }}>
        <h2
          style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          Важливі завдання
        </h2>

        {/* Кнопка додавання */}
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: '#ff6b9d',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Список завдань */}
      <div
        style={{
          height: 'calc(100% - 60px)',
          overflowY: 'auto',
          paddingRight: '8px',
        }}
      >
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>Завантаження...</div>
        ) : tasks.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#000000ff',
            }}
          >
            <p>Наразі немає жодних завдань</p>
            <p>Створіть мершій нове завдання!</p>
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                // Updated button styles according to Figma
                background: '#ffdae0',
                color: '#000',
                border: 'none',
                borderBottom: '4px solid #ffcbd3',
                borderRadius: '100px',
                padding: '10px 24px',
                width: '191px',
                height: '46px',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: '"Lato", sans-serif',
                fontWeight: 400,
                marginTop: '8px',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#ffcbd3';
                e.currentTarget.style.transform = 'translateY(1px)';
                e.currentTarget.style.borderBottom = '3px solid #ffcbd3';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#ffdae0';
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.borderBottom = '4px solid #ffcbd3';
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = 'translateY(2px)';
                e.currentTarget.style.borderBottom = '2px solid #ffcbd3';
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = 'translateY(1px)';
                e.currentTarget.style.borderBottom = '3px solid #ffcbd3';
              }}
            >
              Створити завдання
            </button>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: index === tasks.length - 1 ? 0 : '16px',
                padding: '8px 0',
              }}
            >
              {/* Чекбокс */}
              <button
                onClick={() => handleToggleTask(task.id, task.completed)}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  border: '2px solid #ff6b9d',
                  background: task.completed ? '#ff6b9d' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  flexShrink: 0,
                }}
              >
                {task.completed && <Check size={12} color="white" />}
              </button>

              {/* Текст завдання */}
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  opacity: task.completed ? 0.6 : 1,
                  flex: 1,
                  wordBreak: 'break-word',
                }}
              >
                {task.title}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Модальне вікно для додавання завдання */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              width: '300px',
              maxWidth: '90vw',
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Додати нове завдання</h3>

            <input
              type="text"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              placeholder="Введіть назву завдання..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '16px',
                boxSizing: 'border-box',
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleAddTask();
                }
              }}
              autoFocus
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewTaskTitle('');
                }}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Скасувати
              </button>

              <button
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim()}
                style={{
                  // Updated modal confirm button to match the new style
                  background: '#ffdae0',
                  color: '#000',
                  border: 'none',
                  borderBottom: '4px solid #ffcbd3',
                  borderRadius: '100px',
                  padding: '10px 24px',
                  cursor: newTaskTitle.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontFamily: '"Lato", sans-serif',
                  fontWeight: 400,
                  minWidth: '80px',
                  opacity: newTaskTitle.trim() ? 1 : 0.5,
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={e => {
                  if (newTaskTitle.trim()) {
                    e.currentTarget.style.background = '#ffcbd3';
                    e.currentTarget.style.transform = 'translateY(1px)';
                    e.currentTarget.style.borderBottom = '3px solid #ffcbd3';
                  }
                }}
                onMouseOut={e => {
                  if (newTaskTitle.trim()) {
                    e.currentTarget.style.background = '#ffdae0';
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.borderBottom = '4px solid #ffcbd3';
                  }
                }}
                onMouseDown={e => {
                  if (newTaskTitle.trim()) {
                    e.currentTarget.style.transform = 'translateY(2px)';
                    e.currentTarget.style.borderBottom = '2px solid #ffcbd3';
                  }
                }}
                onMouseUp={e => {
                  if (newTaskTitle.trim()) {
                    e.currentTarget.style.transform = 'translateY(1px)';
                    e.currentTarget.style.borderBottom = '3px solid #ffcbd3';
                  }
                }}
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
