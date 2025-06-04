class PomodoroTimer {
    constructor() {
        this.focusTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60;  // 5 minutes in seconds
        this.currentTime = this.focusTime;
        this.isRunning = false;
        this.isFocusSession = true;
        this.intervalId = null;
        this.totalTime = this.focusTime;
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.timerDisplay = document.getElementById('timerDisplay');
        this.sessionType = document.getElementById('sessionType');
        this.circleProgress = document.getElementById('circleProgress');
        this.timerCircle = document.getElementById('timerCircle');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.restartBtn = document.getElementById('restartBtn');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.restartBtn.addEventListener('click', () => this.restart());
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerCircle.classList.add('timer-active');
            this.statusIndicator.textContent = this.isFocusSession ? 'Focusing...' : 'Taking a break...';
            
            this.intervalId = setInterval(() => {
                this.currentTime--;
                this.updateDisplay();
                
                if (this.currentTime <= 0) {
                    this.completeSession();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.timerCircle.classList.remove('timer-active');
            clearInterval(this.intervalId);
            this.statusIndicator.textContent = 'Paused';
        }
    }
    
    restart() {
        this.pause();
        this.currentTime = this.isFocusSession ? this.focusTime : this.breakTime;
        this.totalTime = this.currentTime;
        this.updateDisplay();
        this.statusIndicator.textContent = this.isFocusSession ? 'Ready to focus' : 'Ready for break';
    }
    
    completeSession() {
        this.pause();
        
        if (this.isFocusSession) {
            this.showNotification('Focus session complete! Time for a break.');
            this.switchToBreak();
        } else {
            this.showNotification('Break time over! Ready for another focus session.');
            this.switchToFocus();
        }
    }
    
    switchToBreak() {
        this.isFocusSession = false;
        this.currentTime = this.breakTime;
        this.totalTime = this.breakTime;
        this.sessionType.textContent = 'Break Time';
        this.sessionType.className = 'session-type break';
        this.circleProgress.classList.add('break-mode');
        this.statusIndicator.textContent = 'Ready for break';
        this.updateDisplay();
    }
    
    switchToFocus() {
        this.isFocusSession = true;
        this.currentTime = this.focusTime;
        this.totalTime = this.focusTime;
        this.sessionType.textContent = 'Focus Session';
        this.sessionType.className = 'session-type focus';
        this.circleProgress.classList.remove('break-mode');
        this.statusIndicator.textContent = 'Ready to focus';
        this.updateDisplay();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update circular progress
        const progress = ((this.totalTime - this.currentTime) / this.totalTime) * 360;
        const color = this.isFocusSession ? '#dc2626' : '#059669';
        this.circleProgress.style.background = `conic-gradient(from 0deg, ${color} ${progress}deg, transparent ${progress}deg)`;
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
        
        // Play a sound notification (if browser supports it)
        try {
            const audio = new Audio('data:audio/wav;base64,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');
            audio.play().catch(e => {
                // Silent fail if audio can't play
            });
        } catch (e) {
            // Silent fail for browsers that don't support this
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});
