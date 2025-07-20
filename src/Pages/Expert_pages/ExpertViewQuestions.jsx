// src/pages/expert/ExpertViewQuestions.jsx
import React, { useState } from 'react';
import styles from '../../style/Expert/ExpertViewQuestions.module.css';
import QuestionCard from '../../components/Expert/QuestionCard';
import RespondModal from '../../components/Expert/RespondModal';

const dummyQuestions = [
  {
    id: 1,
    farmerName: 'Asha K.',
    location: 'Mbeya',
    question: 'Mimea yangu ya nyanya inanyauka ghafla, nifanye nini?',
    date: '2025-06-20',
    image: '/sample1.jpg',
    answered: false,
  },
  {
    id: 2,
    farmerName: 'Juma M.',
    location: 'Moshi',
    question: 'Nitumie aina gani ya mbolea kwa viazi?',
    date: '2025-06-18',
    image: '',
    answered: true,
  },
];

const ExpertViewQuestions = () => {
  const [filter, setFilter] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const filtered = dummyQuestions.filter((q) => {
    if (filter === 'answered') return q.answered;
    if (filter === 'unanswered') return !q.answered;
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Maswali ya Wakulima</h2>
        <div className={styles.filterBtns}>
          <button
            className={filter === 'all' ? styles.active : ''}
            onClick={() => setFilter('all')}
          >
            Yote
          </button>
          <button
            className={filter === 'unanswered' ? styles.active : ''}
            onClick={() => setFilter('unanswered')}
          >
            Bado
          </button>
          <button
            className={filter === 'answered' ? styles.active : ''}
            onClick={() => setFilter('answered')}
          >
            Yaliyojibiwa
          </button>
        </div>
      </div>

      <div className={styles.questionList}>
        {filtered.map((q) => (
          <QuestionCard key={q.id} data={q} onRespond={() => setSelectedQuestion(q)} />
        ))}
      </div>

      {selectedQuestion && (
        <RespondModal
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}
    </div>
  );
};

export default ExpertViewQuestions;
