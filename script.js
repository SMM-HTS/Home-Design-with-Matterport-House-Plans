    const wizardModal = document.getElementById('wizardModal');
    const questionBox = document.getElementById('questionBox');
    const loader = document.getElementById('loader');

    const questions = [
      { id: 'style', text: 'What style of house do you prefer? (Modern, Farmhouse, Traditional)' },
      { id: 'size', text: 'Preferred size range? (2000-4000 sq ft)' },
      { id: 'features', text: 'Any must-have features? (Garage, Pool, Office)' }
    ];

    let currentIndex = 0;
    let answers = {};

    const models = [
      { id: 'abcdef', title: 'Modern Luxury Home', style: 'Modern', size: 3500, features: ['Garage', 'Pool'] },
      { id: 'ghijkl', title: 'Country Farmhouse', style: 'Farmhouse', size: 2800, features: ['Garage'] },
      { id: 'mnopqr', title: 'Elegant Traditional', style: 'Traditional', size: 3000, features: ['Office'] }
    ];

    function openWizard() {
      wizardModal.style.display = 'flex';
      currentIndex = 0;
      answers = {};
      askNextQuestion();
    }

    function closeWizard() {
      wizardModal.style.display = 'none';
      questionBox.innerHTML = '';
    }

    function askNextQuestion() {
      if (currentIndex >= questions.length) {
        showResults();
        return;
      }

      const q = questions[currentIndex];
      questionBox.innerHTML = `
        <h2>${q.text}</h2>
        <input type="text" id="answerInput" style="padding: 10px; width: 80%; margin-top: 10px;" />
        <br><br>
        <button onclick="submitAnswer()" style="padding: 10px 20px;">Next</button>
      `;
    }

    function submitAnswer() {
      const input = document.getElementById('answerInput').value;
      if (!input) return alert('Please enter a value');

      answers[questions[currentIndex].id] = input;
      currentIndex++;
      loader.style.display = 'block';
      questionBox.innerHTML = '';
      setTimeout(() => {
        loader.style.display = 'none';
        askNextQuestion();
      }, 1000);
    }

    function showResults() {
      let filtered = models.filter(model =>
        model.style.toLowerCase() === answers.style.toLowerCase()
      );

      questionBox.innerHTML = '<h2>Recommended House Tours</h2><div class="gallery">';

      if (filtered.length === 0) {
        questionBox.innerHTML += '<p>No matching models found.</p>';
      } else {
        filtered.forEach(model => {
          questionBox.innerHTML += `
            <div class="model-frame">
              <h4>${model.title}</h4>
              <iframe src="https://my.matterport.com/show/?m=${model.id}" frameborder="0" allowfullscreen></iframe>
            </div>
          `;
        });
      }

      questionBox.innerHTML += '</div>';
    }
