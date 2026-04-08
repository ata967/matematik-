let startTime;
let timerInterval;
let timeElapsed = 0;

function startTimer() {
    console.log('Timer started');
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    document.getElementById('timer').textContent = `Süre: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Doğru cevaplar
const answers = {
    q1: '20',
    q2: '180',
    q3: '12.5',
    q4: '92',
    q5: '240',
    q6: '12',
    q7: '60',
    q8: '525',
    q9: '60',
    q10: '150'
};

document.getElementById('submitBtn').addEventListener('click', function() {
    console.log('Submit button clicked');
    stopTimer();
    let score = 0;
    const totalQuestions = Object.keys(answers).length;
    
    for (let i = 1; i <= totalQuestions; i++) {
        const userAnswer = document.getElementById(`q${i}`).value.trim();
        console.log(`q${i}: User: '${userAnswer}', Correct: '${answers[`q${i}`]}'`);
        if (userAnswer === answers[`q${i}`]) {
            score++;
        }
    }
    
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('score').textContent = `Puanınız: ${score}/${totalQuestions}`;
    document.getElementById('timeTaken').textContent = `Geçen Süre: ${timeString}`;
    document.getElementById('results').classList.remove('hidden');
    
    // Sonucu tabloya ekle
    saveResult(score, totalQuestions, timeString);
    
    // Formu devre dışı bırak
    document.getElementById('quizForm').querySelectorAll('input').forEach(input => input.disabled = true);
    this.disabled = true;
});

function saveResult(score, total, time) {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const now = new Date();
    const dateString = now.toLocaleDateString('tr-TR') + ' ' + now.toLocaleTimeString('tr-TR');
    
    results.push({
        date: dateString,
        score: `${score}/${total}`,
        time: time
    });
    
    localStorage.setItem('quizResults', JSON.stringify(results));
    displayResults();
}

function displayResults() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = '';
    
    results.forEach(result => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = result.date;
        row.insertCell(1).textContent = result.score;
        row.insertCell(2).textContent = result.time;
    });
}

// Sayfa yüklendiğinde timer başlat ve önceki sonuçları göster
window.addEventListener('load', function() {
    startTimer();
    displayResults();
});
