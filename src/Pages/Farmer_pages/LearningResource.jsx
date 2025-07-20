import styles from '../../style/farmer/LearningResource.module.css';
import React, { useState } from 'react';

const lessons = [
  {
    id: 1,
    title: 'Mbinu Bora za Upandaji wa Mahindi',
    date: '2025-05-12',
    category: 'Mahindi',
    views: 320,
    content: 'Hili somo linahusu hatua kwa hatua za upandaji bora wa mahindi kuanzia maandalizi ya shamba hadi mavuno.',
  },
  {
    id: 2,
    title: 'Namna ya Kuhifadhi Mazao Baada ya Mavuno',
    date: '2025-05-15',
    category: 'Hifadhi',
    views: 190,
    content: 'Somo hili linatoa mbinu salama na bora za kuhifadhi mazao baada ya kuvuna ili yasiharibike haraka.',
  },
  {
    id: 3,
    title: 'Kilimo Hai: Manufaa kwa Mazingira na Afya',
    date: '2025-06-01',
    category: 'Kilimo Hai',
    views: 410,
    content: 'Tunazungumzia kilimo kisichotumia kemikali nyingi, faida zake kiafya na kimazingira.',
  },
];

const LearningResource = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory ? lesson.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(lessons.map((lesson) => lesson.category))];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Rasilimali za Mafunzo</h3>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Tafuta somo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={styles.categorySelect}
        >
          <option value="">-- Chuja kwa Kategoria --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <ul className={styles.list}>
        {filteredLessons.map((lesson) => (
          <li key={lesson.id} className={styles.item} onClick={() => setSelectedLesson(lesson)}>
            <div>
              <h4 className={styles.lessonTitle}>{lesson.title}</h4>
              <p className={styles.meta}>
                {lesson.category} | {new Date(lesson.date).toLocaleDateString()} | {lesson.views} walioangalia
              </p>
            </div>
          </li>
        ))}
        {filteredLessons.length === 0 && (
          <li className={styles.item}>Hakuna mafunzo yanayolingana na ulichotafuta.</li>
        )}
      </ul>

      {selectedLesson && (
        <div className={styles.modalOverlay} onClick={() => setSelectedLesson(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h4 className={styles.modalTitle}>{selectedLesson.title}</h4>
            <p className={styles.modalMeta}>
              {selectedLesson.category} | {new Date(selectedLesson.date).toLocaleDateString()} | {selectedLesson.views} walioangalia
            </p>
            <p className={styles.modalContent}>{selectedLesson.content}</p>
            <button className={styles.closeBtn} onClick={() => setSelectedLesson(null)}>Funga</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningResource;

