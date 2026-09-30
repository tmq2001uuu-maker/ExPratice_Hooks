import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTheme } from './context/ThemeContext';
import useLocalStorage from './hooks/useLocalStorage';
import { initialTasks } from './data/tasks';

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map(task => task.id === action.payload
        ? { ...task, completed: !task.completed }
        : task);
    default:
      return state;
  }
}

export default function App() {
  const { theme } = useTheme();
  const [savedTasks, setSavedTasks] = useLocalStorage('fer202-tasks', initialTasks);
  const [tasks, dispatch] = useReducer(taskReducer, savedTasks);

  useEffect(() => {
    setSavedTasks(tasks);
  }, [tasks, setSavedTasks]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const addTask = useCallback((title) => {
    dispatch({
      type: 'ADD_TASK',
      payload: { id: crypto.randomUUID(), title, completed: false },
    });
  }, []);

  const toggleTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  // Tính lại danh sách hiển thị khi dữ liệu hoặc điều kiện lọc thay đổi.
  const visibleTasks = useMemo(() => tasks.filter(task => {
    const matchesStatus = filter === 'all' || (filter === 'completed' ? task.completed : !task.completed);
    const matchesSearch = task.title.toLocaleLowerCase('vi')
      .includes(search.trim().toLocaleLowerCase('vi'));
    return matchesStatus && matchesSearch;
  }), [tasks, filter, search]);

  const completedCount = useMemo(() =>
    tasks.filter(task => task.completed).length, [tasks]);

  return (
    <main className={`page ${theme}`}>
      <section className="task-manager" aria-label="Quản lý công việc">
        <Header />
        <div className="content">
          <TaskForm onAdd={addTask} />
          <div className="toolbar">
            <select aria-label="Lọc trạng thái" value={filter} onChange={event => setFilter(event.target.value)}>
              <option value="all">Tất cả</option>
              <option value="pending">Chưa làm</option>
              <option value="completed">Hoàn thành</option>
            </select>
            <input type="search" aria-label="Tìm công việc" placeholder="Tìm kiếm..."
              value={search} onChange={event => setSearch(event.target.value)} />
          </div>
          <p className="stats" aria-live="polite">
            Tổng: {tasks.length}<span> | </span>Chưa làm: {tasks.length - completedCount}<span> | </span>Hoàn thành: {completedCount}
          </p>
          <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </section>
    </main>
  );
}
