document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const dayLabel = document.getElementById('label-day');
    const monthLabel = document.getElementById('label-month');
    const yearLabel = document.getElementById('label-year');
    const dayError = document.getElementById('day-error');
    const monthError = document.getElementById('month-error');
    const yearError = document.getElementById('year-error');
    const yearResult = document.getElementById('year-result');
    const monthResult = document.getElementById('month-result');
    const dayResult = document.getElementById('day-result');
  
    button.addEventListener('click', calculateAge);
  
    function calculateAge() {
      clearErrors();
      const day = parseInt(dayInput.value);
      const month = parseInt(monthInput.value) - 1; 
      const year = parseInt(yearInput.value);
  
      if (!isValidDate(day, month, year)) {
        if (isNaN(day) || day < 1 || day > 31) {
          showError(dayInput, dayLabel, dayError, "Por favor, insira um dia válido.");
        }
        if (isNaN(month) || month < 0 || month > 11) {
          showError(monthInput, monthLabel, monthError, "Por favor, insira um mês válido.");
        }
        if (isNaN(year) || year < 1) {
          showError(yearInput, yearLabel, yearError, "Por favor, insira um ano válido.");
        }
        return;
      }
  
      const birthDate = new Date(year, month, day);
      const today = new Date();
  
      let ageYear = today.getFullYear() - birthDate.getFullYear();
      let ageMonth = today.getMonth() - birthDate.getMonth();
      let ageDay = today.getDate() - birthDate.getDate();
  
      if (ageDay < 0) {
        ageMonth -= 1;
        ageDay += daysInMonth(today.getMonth() - 1, today.getFullYear());
      }
  
      if (ageMonth < 0) {
        ageYear -= 1;
        ageMonth += 12;
      }
  
      yearResult.textContent = ageYear;
      monthResult.textContent = ageMonth;
      dayResult.textContent = ageDay;
    }
  
    function isValidDate(day, month, year) {
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return false;
      }
  
      if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1) {
        return false;
      }
  
      const date = new Date(year, month, day);
      return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
    }
  
    function daysInMonth(month, year) {
      return new Date(year, month + 1, 0).getDate();
    }
  
    function showError(input, label, errorElement, message) {
      input.classList.add('error');
      label.classList.add('error');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  
    function clearErrors() {
      document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
      document.querySelectorAll('label').forEach(label => label.classList.remove('error'));
      document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
      });
    }
  });
  