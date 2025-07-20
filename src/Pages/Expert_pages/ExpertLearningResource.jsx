// src/pages/expert/ExpertLearningResource.jsx
import React, { useState } from 'react';
import styles from '../../style/Expert/ExpertLearningResource.module.css';
import LearningCard from '../../components/Expert/LearningCard';
import AddLearningModal from '../../components/Expert/AddLearningModal';
import ViewLearningModal from '../../components/Expert/ViewLearningModal';

const dummyLessons = [
    {
        id: 1,
        title: 'Mbinu za Kupambana na Magonjwa ya Nyanya',
        cropType: 'Nyanya',
        date: '2025-06-20',
        content: 'Hapa tunajadili njia mbalimbali za kuepusha magonjwa ya nyanya...',
    },
    {
        id: 2,
        title: 'Mbolea Sahihi kwa Mahindi',
        cropType: 'Mahindi',
        date: '2025-06-18',
        content: 'Kwa mavuno mazuri ya mahindi, tumia mbolea aina ya NPK...',
    },
];

const ExpertLearningResource = () => {
    const [lessons, setLessons] = useState(dummyLessons);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [search, setSearch] = useState('');

    const filteredLessons = lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddLesson = (newLesson) => {
        setLessons((prev) => [...prev, { ...newLesson, id: Date.now() }]);
        setShowAddModal(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <h2>Mafunzo kwa Wakulima</h2>
                <div className={styles.actions}>
                    <input
                        type="text"
                        placeholder="Tafuta mafunzo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
                        + Ongeza Funzo
                    </button>
                </div>
            </div>

            <div className={styles.lessonList}>
                {filteredLessons.map((lesson) => (
                    <LearningCard
                        key={lesson.id}
                        lesson={lesson}
                        onView={() => setSelectedLesson(lesson)}
                    />
                ))}
            </div>

            {showAddModal && (
                <AddLearningModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAddLesson}
                />
            )}

            {selectedLesson && (
                <ViewLearningModal
                    lesson={selectedLesson}
                    onClose={() => setSelectedLesson(null)}
                />
            )}
        </div>
    );
};

export default ExpertLearningResource;
