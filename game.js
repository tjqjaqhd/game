class CryptoMinerTycoon {
    constructor() {
        this.gameState = {
            coins: 0,
            level: 1,
            clickReward: 1,
            coinsPerSecond: 0,
            totalCoinsEarned: 0,
            totalClicks: 0,
            experience: 0,
            experienceToNextLevel: 100,
            multiplier: 1,
            adBonusActive: false,
            adBonusEndTime: 0,
            upgrades: {
                cursor: { count: 0, cost: 15, baseIncome: 0.1 },
                miner: { count: 0, cost: 100, baseIncome: 1 },
                gpu: { count: 0, cost: 1100, baseIncome: 8 },
                asic: { count: 0, cost: 12000, baseIncome: 47 },
                farm: { count: 0, cost: 130000, baseIncome: 260 },
                factory: { count: 0, cost: 1400000, baseIncome: 1400 },
                datacenter: { count: 0, cost: 20000000, baseIncome: 7800 },
                quantum: { count: 0, cost: 330000000, baseIncome: 44000 }
            },
            achievements: {
                firstClick: { completed: false, reward: 10 },
                hundredClicks: { completed: false, reward: 100 },
                thousandClicks: { completed: false, reward: 1000 },
                firstUpgrade: { completed: false, reward: 50 },
                millionaire: { completed: false, reward: 10000 },
                levelTen: { completed: false, reward: 5000 },
                speedDemon: { completed: false, reward: 2000 },
                collector: { completed: false, reward: 15000 }
            }
        };

        this.upgradeData = {
            cursor: { name: "자동 클릭커", icon: "🖱️", description: "자동으로 클릭해줍니다" },
            miner: { name: "기본 채굴기", icon: "⛏️", description: "기본적인 채굴 장비" },
            gpu: { name: "GPU 채굴기", icon: "🔧", description: "고성능 그래픽 카드로 채굴" },
            asic: { name: "ASIC 채굴기", icon: "🔩", description: "전용 채굴 하드웨어" },
            farm: { name: "채굴 농장", icon: "🏭", description: "대규모 채굴 시설" },
            factory: { name: "채굴 공장", icon: "🏗️", description: "산업용 채굴 시설" },
            datacenter: { name: "데이터센터", icon: "🏢", description: "거대한 채굴 데이터센터" },
            quantum: { name: "양자 채굴기", icon: "⚛️", description: "미래 기술 채굴 시스템" }
        };

        this.achievementData = {
            firstClick: { name: "첫 클릭", description: "첫 번째 클릭을 해보세요" },
            hundredClicks: { name: "클릭 마스터", description: "100번 클릭하기" },
            thousandClicks: { name: "클릭 전설", description: "1000번 클릭하기" },
            firstUpgrade: { name: "첫 업그레이드", description: "첫 번째 업그레이드 구매" },
            millionaire: { name: "백만장자", description: "1,000,000 코인 모으기" },
            levelTen: { name: "레벨 마스터", description: "레벨 10 달성" },
            speedDemon: { name: "속도의 악마", description: "초당 100 코인 달성" },
            collector: { name: "수집가", description: "모든 업그레이드 구매"  }
        };

        this.init();
    }

    init() {
        this.loadGame();
        this.updateDisplay();
        this.setupEventListeners();
        this.startGameLoop();
        this.renderShop();
        this.renderAchievements();
    }

    setupEventListeners() {
        document.getElementById('mineButton').addEventListener('click', () => this.mine());
        document.getElementById('saveButton').addEventListener('click', () => this.saveGame());
        document.getElementById('loadButton').addEventListener('click', () => this.loadGame());
        document.getElementById('resetButton').addEventListener('click', () => this.resetGame());
        document.getElementById('adButton').addEventListener('click', () => this.watchAd());
    }

    mine() {
        const reward = this.gameState.clickReward * this.gameState.multiplier;
        this.gameState.coins += reward;
        this.gameState.totalCoinsEarned += reward;
        this.gameState.totalClicks++;
        this.gameState.experience += 1;

        this.createCoinEffect(reward);
        this.checkLevelUp();
        this.checkAchievements();
        this.updateDisplay();
    }

    createCoinEffect(amount) {
        const effect = document.createElement('div');
        effect.className = 'coin-effect';
        effect.textContent = `+${this.formatNumber(amount)}`;
        effect.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
        
        document.getElementById('miningEffects').appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }

    checkLevelUp() {
        if (this.gameState.experience >= this.gameState.experienceToNextLevel) {
            this.gameState.level++;
            this.gameState.experience -= this.gameState.experienceToNextLevel;
            this.gameState.experienceToNextLevel = Math.floor(this.gameState.experienceToNextLevel * 1.5);
            this.gameState.clickReward = Math.floor(this.gameState.clickReward * 1.2);
            
            this.showNotification(`레벨 ${this.gameState.level} 달성! 클릭 보상 증가!`);
            this.checkAchievements();
        }
    }

    checkAchievements() {
        const achievements = this.gameState.achievements;
        
        if (!achievements.firstClick.completed && this.gameState.totalClicks >= 1) {
            this.completeAchievement('firstClick');
        }
        
        if (!achievements.hundredClicks.completed && this.gameState.totalClicks >= 100) {
            this.completeAchievement('hundredClicks');
        }
        
        if (!achievements.thousandClicks.completed && this.gameState.totalClicks >= 1000) {
            this.completeAchievement('thousandClicks');
        }
        
        if (!achievements.firstUpgrade.completed && this.getTotalUpgrades() >= 1) {
            this.completeAchievement('firstUpgrade');
        }
        
        if (!achievements.millionaire.completed && this.gameState.totalCoinsEarned >= 1000000) {
            this.completeAchievement('millionaire');
        }
        
        if (!achievements.levelTen.completed && this.gameState.level >= 10) {
            this.completeAchievement('levelTen');
        }
        
        if (!achievements.speedDemon.completed && this.gameState.coinsPerSecond >= 100) {
            this.completeAchievement('speedDemon');
        }
        
        if (!achievements.collector.completed && this.hasAllUpgrades()) {
            this.completeAchievement('collector');
        }
    }

    getTotalUpgrades() {
        return Object.values(this.gameState.upgrades).reduce((total, upgrade) => total + upgrade.count, 0);
    }

    hasAllUpgrades() {
        return Object.values(this.gameState.upgrades).every(upgrade => upgrade.count > 0);
    }

    completeAchievement(achievementKey) {
        const achievement = this.gameState.achievements[achievementKey];
        if (!achievement.completed) {
            achievement.completed = true;
            this.gameState.coins += achievement.reward;
            this.showNotification(`업적 달성: ${this.achievementData[achievementKey].name}! +${this.formatNumber(achievement.reward)} 코인`);
            this.renderAchievements();
        }
    }

    buyUpgrade(upgradeKey) {
        const upgrade = this.gameState.upgrades[upgradeKey];
        
        if (this.gameState.coins >= upgrade.cost) {
            this.gameState.coins -= upgrade.cost;
            upgrade.count++;
            upgrade.cost = Math.floor(upgrade.cost * 1.15);
            
            this.calculateCoinsPerSecond();
            this.checkAchievements();
            this.updateDisplay();
            this.renderShop();
            
            this.showNotification(`${this.upgradeData[upgradeKey].name} 구매 완료!`);
        }
    }

    calculateCoinsPerSecond() {
        let total = 0;
        Object.keys(this.gameState.upgrades).forEach(key => {
            const upgrade = this.gameState.upgrades[key];
            total += upgrade.count * upgrade.baseIncome;
        });
        this.gameState.coinsPerSecond = total * this.gameState.multiplier;
    }

    watchAd() {
        if (!this.gameState.adBonusActive) {
            this.gameState.adBonusActive = true;
            this.gameState.adBonusEndTime = Date.now() + 30000; // 30초 보너스
            this.gameState.multiplier = 2;
            this.showNotification('광고 시청 완료! 30초간 2배 보너스 활성화!');
            this.calculateCoinsPerSecond();
            this.updateDisplay();
        }
    }

    updateDisplay() {
        document.getElementById('coins').textContent = this.formatNumber(this.gameState.coins);
        document.getElementById('coinsPerSecond').textContent = this.formatNumber(this.gameState.coinsPerSecond);
        document.getElementById('level').textContent = this.gameState.level;
        document.getElementById('clickReward').textContent = this.formatNumber(this.gameState.clickReward * this.gameState.multiplier);
        
        const progressPercent = (this.gameState.experience / this.gameState.experienceToNextLevel) * 100;
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
        document.getElementById('progressText').textContent = `${this.gameState.experience}/${this.gameState.experienceToNextLevel}`;
        
        // 광고 보너스 표시
        if (this.gameState.adBonusActive) {
            const timeLeft = Math.max(0, this.gameState.adBonusEndTime - Date.now());
            if (timeLeft > 0) {
                document.getElementById('adButton').textContent = `보너스 활성화 ${Math.ceil(timeLeft / 1000)}초`;
            } else {
                this.gameState.adBonusActive = false;
                this.gameState.multiplier = 1;
                this.calculateCoinsPerSecond();
                document.getElementById('adButton').textContent = '광고 보기';
            }
        }
    }

    renderShop() {
        const shopGrid = document.getElementById('shopGrid');
        shopGrid.innerHTML = '';
        
        Object.keys(this.gameState.upgrades).forEach(key => {
            const upgrade = this.gameState.upgrades[key];
            const upgradeInfo = this.upgradeData[key];
            
            const shopItem = document.createElement('div');
            shopItem.className = `shop-item ${this.gameState.coins < upgrade.cost ? 'disabled' : ''}`;
            shopItem.innerHTML = `
                <div class="shop-item-header">
                    <span class="shop-item-name">${upgradeInfo.icon} ${upgradeInfo.name}</span>
                    <span class="shop-item-count">${upgrade.count}</span>
                </div>
                <div class="shop-item-description">${upgradeInfo.description}</div>
                <div class="shop-item-description">초당 +${this.formatNumber(upgrade.baseIncome)} 코인</div>
                <div class="shop-item-price">💰 ${this.formatNumber(upgrade.cost)}</div>
            `;
            
            shopItem.addEventListener('click', () => this.buyUpgrade(key));
            shopGrid.appendChild(shopItem);
        });
    }

    renderAchievements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        achievementsGrid.innerHTML = '';
        
        Object.keys(this.gameState.achievements).forEach(key => {
            const achievement = this.gameState.achievements[key];
            const achievementInfo = this.achievementData[key];
            
            const achievementItem = document.createElement('div');
            achievementItem.className = `achievement-item ${achievement.completed ? 'completed' : ''}`;
            achievementItem.innerHTML = `
                <div class="achievement-header">
                    <span class="achievement-name">${achievement.completed ? '🏆' : '🔒'} ${achievementInfo.name}</span>
                    <span class="achievement-reward">+${this.formatNumber(achievement.reward)}</span>
                </div>
                <div class="achievement-description">${achievementInfo.description}</div>
            `;
            
            achievementsGrid.appendChild(achievementItem);
        });
    }

    startGameLoop() {
        setInterval(() => {
            if (this.gameState.coinsPerSecond > 0) {
                this.gameState.coins += this.gameState.coinsPerSecond / 10; // 0.1초마다 업데이트
                this.gameState.totalCoinsEarned += this.gameState.coinsPerSecond / 10;
                this.updateDisplay();
            }
            
            this.checkAchievements();
        }, 100);
        
        // 자동 저장 (30초마다)
        setInterval(() => {
            this.saveGame();
        }, 30000);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.getElementById('notificationContainer').appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return Math.floor(num).toString();
    }

    saveGame() {
        try {
            localStorage.setItem('cryptoMinerTycoon', JSON.stringify(this.gameState));
            this.showNotification('게임이 저장되었습니다!');
        } catch (error) {
            console.error('저장 실패:', error);
            this.showNotification('저장에 실패했습니다.');
        }
    }

    loadGame() {
        try {
            const saved = localStorage.getItem('cryptoMinerTycoon');
            if (saved) {
                const savedState = JSON.parse(saved);
                // 기존 게임 상태와 병합하여 새로운 기능 호환성 유지
                this.gameState = { ...this.gameState, ...savedState };
                this.calculateCoinsPerSecond();
                this.updateDisplay();
                this.renderShop();
                this.renderAchievements();
                this.showNotification('게임이 불러와졌습니다!');
            }
        } catch (error) {
            console.error('불러오기 실패:', error);
            this.showNotification('불러오기에 실패했습니다.');
        }
    }

    resetGame() {
        if (confirm('정말로 게임을 초기화하시겠습니까? 모든 진행 상황이 삭제됩니다.')) {
            localStorage.removeItem('cryptoMinerTycoon');
            location.reload();
        }
    }
}

// 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    window.game = new CryptoMinerTycoon();
});

// 페이지 종료 시 자동 저장
window.addEventListener('beforeunload', () => {
    if (window.game) {
        window.game.saveGame();
    }
});