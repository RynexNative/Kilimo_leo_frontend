import React, { useEffect, useRef, useState } from 'react';
import styles from '../../style/farmer/AskExpert.module.css';
import { FaCamera, FaPlus } from 'react-icons/fa';
import axiosAuthApi from '../../utils/http';

const AskExpert = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
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

  const defaultQuestionImage = 'https://rynexnative.com/logo.png';

  // 🔹 Fetch questions
  const fetchQuestions = async () => {
    try {
      const resp = await axiosAuthApi.get('/questions/qn/');
      setQuestions(resp);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 🔹 Submit question to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    try {
      const formData = new FormData();
      formData.append('title', title || 'General');
      formData.append('content', questionText);
      // if (category) formData.append('category', category);
      if (image) formData.append('image', image);

      const resp = await axiosAuthApi.post('/questions/qn/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Add the new question to state
      setQuestions([resp.data, ...questions]);
      setTitle('');
      setQuestionText('');
      setCategory('');
      setImage(null);
    } catch (err) {
      console.error('Error submitting question:', err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const filteredQuestions = questions?.filter((q) =>
    q?.content.toLowerCase().includes(search.toLowerCase())
  );

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

      <input
        type="text"
        placeholder="Tafuta swali..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {/* Form ya kuuliza swali */}
      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Kichwa cha Swali (optional)"
          className={styles.textarea}
        />

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
            <img src={URL.createObjectURL(image)} alt="preview" className={styles.previewImage} />
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>
          Tuma Swali
        </button>
      </form>

      <button
        className={`${styles.scrollToFormBtn} ${!showScrollIcon ? styles.hidden : ''}`}
        onClick={scrollToForm}
      >
        <FaPlus /> Uliza Swali
      </button>

      <div className={styles.questionList}>
        <h3>Maswali Yako</h3>
        {filteredQuestions.length === 0 && <p>Hakuna swali lililopatikana.</p>}

        {filteredQuestions.map((q) => (
          <div key={q.id} className={styles.questionCard}>
            <p className={styles.qText}>
              <strong>Swali:</strong> {q.content}
            </p>
            <p className={styles.meta}>
              {q.category || 'General'} | {new Date(q.created_at).toLocaleDateString()} | Status:{' '}
              <span
                className={`${styles.status} ${
                  q.is_resolved ? styles.resolved : styles.pending
                }`}
              >
                {q.is_resolved ? 'Jibu Limepatikana' : 'Pending'}
              </span>
            </p>

            <img
              src={q.image || defaultQuestionImage}
              alt="Swali"
              className={styles.cardImage}
            />

            {q.answers.length > 0 ? (
              q.answers.map((ans, idx) => (
                <div key={idx} className={styles.answerBox}>
                  <strong>Jibu:</strong>
                  <p>{ans.content}</p>
                </div>
              ))
            ) : (
              <div className={styles.answerBox}>
                <em>Swali hili bado halijajibiwa na mtaalamu.</em>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className={styles.loadingSpinner}>
            Inapakia maswali zaidi...
          </div>
        )}

        <div ref={bottomRef} className={styles.bottomMarker}></div>
      </div>
    </div>
  );
};

export default AskExpert;
