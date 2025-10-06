import React, { useEffect, useState } from 'react'
import styles from '../../style/farmer/LearningResource.module.css';
import ContentCard from '../../components/Admin/ContentCard';
import { FaBook, FaBookDead, FaBookReader, FaChartLine, FaWarehouse } from 'react-icons/fa';
import axiosAuthApi from '../../utils/http';
// import Pdf_vd from '../../components/Admin/Pdf_vd';

function Pvm() {
  const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loadingLesson, setLoadingLesson] = useState(false);
  
    const getData = async () => {
      try {
        const resp = await axiosAuthApi.get('/learning/resources/');
        setLessons(resp); // ✅ hakikisha ni resp.data
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getData();
    }, [selectedLesson]);
  
    const handleViewLesson = async (lessonId) => {
      try {
        setLoadingLesson(true);
        const resp = await axiosAuthApi.get(`/learning/resources/${lessonId}/`);
        setSelectedLesson(resp); // ✅ weka data ya moja kwa moja
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingLesson(false);
      }
    };
  
    const filteredLessons = lessons
      ?.filter((lesson) => {
        const matchesSearch = lesson.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory = filterCategory
          ? lesson.category?.name === filterCategory
          : true;
        return matchesSearch && matchesCategory;
      })
      .sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
  
    const categories = [
      ...new Set(lessons?.map((lesson) => lesson.category?.name)),
    ].filter(Boolean);
  
    const defaultThumbnail = 'https://rynexnative.com/logo.png';
  
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>📚 Rasilimali za Mafunzo</h3>
  
        {/* Filters */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="🔍 Tafuta somo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
  
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="">-- Kategoria Zote --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
  
        {/* List */}
        <div className={styles.grid}>
          {filteredLessons?.map((lesson) => (
            <div
              key={lesson.id}
              className={styles.card}
              onClick={() => handleViewLesson(lesson.id)} // ✅ badala ya moja kwa moja
            >
              <img
                src={lesson.thumbnail || defaultThumbnail}
                alt={lesson.title}
                className={styles.thumbnail}
                onError={(e) => (e.target.src = defaultThumbnail)}
              />
              <div className={styles.cardBody}>
                <h4 className={styles.lessonTitle}>{lesson.title}</h4>
                <p className={styles.meta}>
                  {lesson.category?.name} |{' '}
                  {new Date(lesson.created_at).toLocaleDateString()} | 👀{' '}
                  Views {lesson.views_count}
                </p>
              </div>
            </div>
          ))}
          {filteredLessons?.length === 0 && (
            <p className={styles.noData}>
              ⚠️ Hakuna mafunzo yanayopatikana kwa vigezo hivi.
            </p>
          )}
        </div>
  
        {/* Modal */}
        {selectedLesson && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedLesson(null)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              {loadingLesson ? (
                <p>⏳ Inapakia...</p>
              ) : (
                <>
                  <h4 className={styles.modalTitle}>{selectedLesson.title}</h4>
                  <p className={styles.modalMeta}>
                    {selectedLesson.category?.name} |{' '}
                    {new Date(selectedLesson.created_at).toLocaleDateString()} | 👀{' '}
                    Views {selectedLesson.total_views ?? selectedLesson.viewers_count}
                  </p>
  
                  {/* Dynamic Content */}
                  {selectedLesson.resource_type === 'Video' ? (
                    <video controls className={styles.videoPlayer}>
                      <source src={selectedLesson.file} type="video/mp4" />
                      Browser yako haiwezi kucheza video hii.
                    </video>
                  ) : selectedLesson.resource_type === 'PDF' ? (
                    <a
                      href={selectedLesson.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.pdfLink}
                    >
                      📄 Fungua PDF
                    </a>
                  ) : (
                    <a
                      href={selectedLesson.url || selectedLesson.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.articleLink}
                    >
                      📖 Soma Makala
                    </a>
                  )}
  
                  <p className={styles.modalContent}>
                    {selectedLesson.description}
                  </p>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setSelectedLesson(null)}
                  >
                    Funga
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
}

export default Pvm