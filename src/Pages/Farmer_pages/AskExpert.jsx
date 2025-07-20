// src/components/farmer/AskExpert.jsx
import React, { useEffect, useRef, useState  } from 'react';
import styles from '../../style/farmer/AskExpert.module.css';
import { FaCamera, FaPlus } from 'react-icons/fa';


const AskExpert = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [image, setImage] = useState(null);
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const bottomRef = useRef();
  const formRef = useRef();
  const scrollContainer = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const newQuestion = {
      id: Date.now(),
      question: questionText,
      category,
      date: new Date().toISOString(),
      status: 'pending',
      answer: null,
      image,
    };

    setQuestions([newQuestion, ...questions]);
    setQuestionText('');
    setCategory('');
    setImage(null);
  };

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const container = scrollContainer.current || window;
    const handleScroll = () => {
      const formTop = formRef.current?.getBoundingClientRect().top;
      setShowScrollIcon(formTop && formTop < -100);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setLoading(true);
        setTimeout(() => {
          const newItems = Array.from({ length: 5 }).map((_, i) => ({
            id: Date.now() + i,
            question: `Swali jipya #${questions.length + i + 1}`,
            category: 'Mbegu',
            date: new Date().toISOString(),
            status: 'pending',
            answer: null,
          }));
          setQuestions((prev) => [...prev, ...newItems]);
          setLoading(false);
        }, 4000);
      }
    });
    if (bottomRef.current) {
      observer.current.observe(bottomRef.current);
    }
    return () => {
      if (observer.current && bottomRef.current) {
        observer.current.unobserve(bottomRef.current);
      }
    };
  }, [questions, loading]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={scrollContainer}
      className={styles.container}
      style={{ overflowY: 'auto', maxHeight: '100vh' }}
    >
      <h2 className={styles.title}>Uliza Mtaalamu wa Kilimo</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Tafuta swali..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {/* Form ya kuuliza swali */}
      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Andika swali lako hapa..."
          className={styles.textarea}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">Chagua aina ya swali</option>
          <option value="Magonjwa">Magonjwa</option>
          <option value="Udongo">Udongo</option>
          <option value="Mbegu">Mbegu</option>
          <option value="Pembejeo">Pembejeo</option>
        </select>

        <label className={styles.imageUploadLabel}>
          <FaCamera className={styles.cameraIcon} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.hiddenInput}
          />
        </label>

        {image && (
          <div className={styles.previewContainer}>
            <img src={image} alt="preview" className={styles.previewImage} />
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>Tuma Swali</button>
      </form>

      {/* Icon ya kurudi kwenye form */}
      <button
        className={`${styles.scrollToFormBtn} ${!showScrollIcon ? styles.hidden : ''}`}
        onClick={scrollToForm}
      >
        <FaPlus /> Uliza Swali
      </button>

      {/* List ya maswali yaliyoulizwa */}
      <div className={styles.questionList}>
        <h3>Maswali Yako</h3>
        {filteredQuestions.length === 0 && <p>Hakuna swali lililopatikana.</p>}

        {filteredQuestions.map((q) => (
          <div key={q.id} className={styles.questionCard}>
            <p className={styles.qText}><strong>Swali:</strong> {q.question}</p>
            <p className={styles.meta}>
              {q.category} | {new Date(q.date).toLocaleDateString()} | Status:
              <span className={styles.status + ' ' + styles[q.status]}>{q.status}</span>
            </p>
            {q.image && (
              <img src={q.image} alt="Swali" className={styles.cardImage} />
            )}
            {q.answer ? (
              <div className={styles.answerBox}>
                <strong>Jibu:</strong>
                <p>{q.answer}</p>
              </div>
            ) : (
              <div className={styles.answerBox}>
                <em>Swali hili bado halijajibiwa na mtaalamu.</em>
              </div>
            )}
          </div>
        ))}

        {loading && <div className={styles.loadingSpinner}>Inapakia maswali zaidi...</div>}

        <div ref={bottomRef} className={styles.bottomMarker}></div>
      </div>
    </div>
  );
};

export default AskExpert;


