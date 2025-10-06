import React, { useEffect, useState } from "react";
import styles from "../../style/Admin/Qns.module.css";
import axiosAuthApi from "../../utils/http";
import AnswersModal from "../../components/Admin/AnswersModal";
import DeleteModal from "../../components/Admin/DeleteModal";

function Qns() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false)
  //  const [answer, setAnswer] = useState("");

  const [data, setData] = useState({
    content: '',
    image: '',
    is_accepted: true,
  })

  const [Errors, setErrors] = useState({ errCont: null, errImage: null })




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (data.content === '') {
      setShowModal(true);
      setErrors({ ...Errors, errCont: 'Jaza sehemu hii...' });
      return;
    }
  
    const formData = new FormData();
    formData.append("question", selectedQuestion); // ID ya swali
    formData.append("content", data.content);
    formData.append("is_accepted", data.is_accepted);
    
    if (data.image) {
      formData.append("image", data.image); // hapa lazima iwe File object
    }
  
    try {
      const resp = await axiosAuthApi.post('/questions/answers/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setErrors({ ...Errors, errCont: '' });
      setShowModal(false);
      setData({ content: '', image: '', is_accepted: true });
    } catch (err) {
      console.error(err);
      alert("Internal Error");
      setErrors({ ...Errors, errCont: '' });
      setShowModal(false);
    }
  };
  

  // Fetch maswali kutoka backend
  const fetchQuestions = async () => {
    try {
      const resp = await axiosAuthApi.get("/questions/qn/");
      setQuestions(resp);
    } catch (err) {
      console.error("❌ Error fetching questions:", err);
    }
  };


  useEffect(() => {
    fetchQuestions();
  }, [showModal]);

  // Filter
  //  console.log(questions)
  const filteredQuestions = questions?.filter((q) => {
    const matchesSearch = q?.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "answered"
          ? q?.is_resolved > 0
          : !q?.is_resolved;
    return matchesSearch && matchesFilter;
  });

  // Handle answer submit
  //  const handleAnswer = async () => {
  //   try {
  //    await axiosAuthApi.post(`/questions/${selectedQuestion.id}/answer/`, {
  //     answer,
  //    });
  //    setAnswer("");
  //    setSelectedQuestion(null);
  //    fetchQuestions(); // refresh
  //   } catch (err) {
  //    console.error("❌ Error answering question:", err);
  //   }
  //  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Una uhakika unataka kufuta hili swali?")) return;
    try {
      await axiosAuthApi.delete(`/questions/${id}/`);
      fetchQuestions();
    } catch (err) {
      console.error("❌ Error deleting:", err);
    }
  };

  const show = (id) => {
    setShowModal(true)
    setSelectedQuestion(id)
    if (selectedQuestion) {
      console.log(selectedQuestion)
    }
  }

  return (
    <div className={styles.container}>
      <h3>💬 Maswali ya Wakulima</h3>

      {/* Search & Filter */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="🔍 Tafuta swali..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Yote</option>
          <option value="answered">Yaliyojibiwa</option>
          <option value="pending">Bado</option>
        </select>
      </div>

      {/* Question List */}
      <div className={styles.list}>
        {filteredQuestions?.map((q) => (
          <div key={q.id} className={styles.card}>
            <div className={styles.cardBody}>
              <h4>{q.asked_by}</h4>
              <h2>Title: {q.title}</h2>
              <p className={styles.question}>Swali: {q.content}</p>
              <img src={q.image} alt="" />
              {q.answers?.length > 0 ? (
                q.answers.map((a) => (
                  <div key={a.id} className={styles.jibu}>
                    <p><strong>Jibu:</strong> {a.content}</p>
                    {a.image ? <div>
                      <img src={a.image} alt="" />

                    </div> : <div />}

                    <small>👩‍🌾 {a.answered_by}</small>
                  </div>
                ))
              ) : (
                <p />
              )}

              {q.answers?.length > 0 ? (
                q.answers.map((a) => (
                  <div key={a.id}>
                    <p className={styles.meta}>
                      📅 {new Date(q.created_at).toLocaleDateString()} |{" "}
                      {a.is_accepted ? "✅ Imejibiwa" : "⏳ Haijajibiwa"}
                    </p>
                  </div>
                ))
              ) : (
                <p className={styles.meta}>
                  📅 {new Date(q.created_at).toLocaleDateString()} |{" "}
                  ⏳ Haijajibiwa
                </p>
              )}
            </div>
            <div className={styles.actions}>
              {q.answers?.length > 0 ? (
                <button onClick={() => show(q.id)} disabled>✍️ Jibu</button>
              ) : (<button onClick={() => show(q.id)}>✍️ Jibu</button>)}
              {/* <button onClick={() => handleDelete(q.id)} className={styles.delete}>
                🗑️ Futa
              </button> */}
            </div>
          </div>
        ))}
        {filteredQuestions?.length === 0 && (
          <p className={styles.noData}>⚠️ Hakuna maswali yaliyopatikana.</p>
        )}
      </div>

      {/* Answer Modal */}
      <AnswersModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        datainp={data}
        onChange={setData}
        onAdd={handleSubmit}
        Error={Errors}
      />

      <DeleteModal onDelete={handleDelete}/>
    </div>
  );
}

export default Qns;
