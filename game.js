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
            // Prestige System
            prestige: {
                level: 0,
                totalResets: 0,
                prestigePoints: 0,
                totalPrestigePoints: 0,
                bonuses: {
                    clickMultiplier: 1,
                    incomeMultiplier: 1,
                    experienceMultiplier: 1,
                    offlineEarningsMultiplier: 1
                }
            },
            // Enhanced upgrade system
            upgrades: {
                cursor: { count: 0, cost: 15, baseIncome: 0.1 },
                miner: { count: 0, cost: 100, baseIncome: 1 },
                gpu: { count: 0, cost: 1100, baseIncome: 8 },
                asic: { count: 0, cost: 12000, baseIncome: 47 },
                farm: { count: 0, cost: 130000, baseIncome: 260 },
                factory: { count: 0, cost: 1400000, baseIncome: 1400 },
                datacenter: { count: 0, cost: 20000000, baseIncome: 7800 },
                quantum: { count: 0, cost: 330000000, baseIncome: 44000 },
                // New upgrade categories
                spaceMiner: { count: 0, cost: 5000000000, baseIncome: 200000 },
                aiMiner: { count: 0, cost: 100000000000, baseIncome: 1000000 },
                timeMiner: { count: 0, cost: 2000000000000, baseIncome: 5000000 },
                dimensionMiner: { count: 0, cost: 50000000000000, baseIncome: 25000000 }
            },
            // Skill Tree System
            skillTree: {
                availablePoints: 0,
                skills: {
                    clickPower: { level: 0, maxLevel: 20, cost: 1 },
                    autoClicker: { level: 0, maxLevel: 10, cost: 2 },
                    incomeBoost: { level: 0, maxLevel: 15, cost: 1 },
                    experienceGain: { level: 0, maxLevel: 10, cost: 3 },
                    offlineEarnings: { level: 0, maxLevel: 5, cost: 5 },
                    luckyChance: { level: 0, maxLevel: 8, cost: 4 },
                    criticalClick: { level: 0, maxLevel: 12, cost: 3 }
                }
            },
            // Daily Challenges
            dailyChallenge: {
                lastReset: 0,
                currentChallenge: null,
                completed: false,
                streak: 0,
                totalCompleted: 0
            },
            // Statistics
            statistics: {
                totalPlayTime: 0,
                gameStartTime: Date.now(),
                lastPlayTime: Date.now(),
                maxCoinsPerSecond: 0,
                maxLevel: 1,
                totalUpgradesBought: 0,
                totalAchievementsUnlocked: 0,
                totalPrestigeResets: 0,
                offlineEarnings: 0
            },
            achievements: {
                firstClick: { completed: false, reward: 10 },
                hundredClicks: { completed: false, reward: 100 },
                thousandClicks: { completed: false, reward: 1000 },
                firstUpgrade: { completed: false, reward: 50 },
                millionaire: { completed: false, reward: 10000 },
                levelTen: { completed: false, reward: 5000 },
                speedDemon: { completed: false, reward: 2000 },
                collector: { completed: false, reward: 15000 },
                // New achievements
                firstPrestige: { completed: false, reward: 50000 },
                skillMaster: { completed: false, reward: 25000 },
                dailyWarrior: { completed: false, reward: 15000 },
                spaceExplorer: { completed: false, reward: 100000 },
                timeTraveler: { completed: false, reward: 500000 },
                dimensionHopper: { completed: false, reward: 1000000 }
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
            quantum: { name: "양자 채굴기", icon: "⚛️", description: "미래 기술 채굴 시스템" },
            // New upgrade categories
            spaceMiner: { name: "우주 채굴기", icon: "🚀", description: "우주 공간에서 채굴하는 고급 시설" },
            aiMiner: { name: "AI 채굴기", icon: "🤖", description: "인공지능이 최적화하는 채굴 시스템" },
            timeMiner: { name: "시간 채굴기", icon: "⏰", description: "시간을 조작하여 채굴 속도를 높임" },
            dimensionMiner: { name: "차원 채굴기", icon: "🌌", description: "다차원에서 동시에 채굴하는 궁극 시설" }
        };

        this.achievementData = {
            firstClick: { name: "첫 클릭", description: "첫 번째 클릭을 해보세요" },
            hundredClicks: { name: "클릭 마스터", description: "100번 클릭하기" },
            thousandClicks: { name: "클릭 전설", description: "1000번 클릭하기" },
            firstUpgrade: { name: "첫 업그레이드", description: "첫 번째 업그레이드 구매" },
            millionaire: { name: "백만장자", description: "1,000,000 코인 모으기" },
            levelTen: { name: "레벨 마스터", description: "레벨 10 달성" },
            speedDemon: { name: "속도의 악마", description: "초당 100 코인 달성" },
            collector: { name: "수집가", description: "모든 업그레이드 구매" },
            // New achievements
            firstPrestige: { name: "새로운 시작", description: "첫 번째 프레스티지 달성" },
            skillMaster: { name: "스킬 마스터", description: "모든 스킬 최대 레벨" },
            dailyWarrior: { name: "일일 전사", description: "일일 도전 10회 완료" },
            spaceExplorer: { name: "우주 탐험가", description: "우주 채굴기 구매" },
            timeTraveler: { name: "시간 여행자", description: "시간 채굴기 구매" },
            dimensionHopper: { name: "차원 여행자", description: "차원 채굴기 구매" }
        };

        // Skill Tree Data
        this.skillData = {
            clickPower: { name: "클릭 파워", description: "클릭 보상 +10% 증가", icon: "👆" },
            autoClicker: { name: "자동 클릭", description: "자동으로 클릭 +5% 확률", icon: "🔄" },
            incomeBoost: { name: "수익 증가", description: "모든 수익 +15% 증가", icon: "💰" },
            experienceGain: { name: "경험치 획득", description: "경험치 +20% 증가", icon: "⭐" },
            offlineEarnings: { name: "오프라인 수익", description: "오프라인 수익 +50% 증가", icon: "💤" },
            luckyChance: { name: "행운의 기회", description: "크리티컬 획득 확률 +5%", icon: "🍀" },
            criticalClick: { name: "치명타 클릭", description: "치명타 데미지 +25% 증가", icon: "⚡" }
        };

        // Daily Challenges Data
        this.dailyChallenges = [
            { id: 'clicks', name: '클릭 챌린지', description: '500번 클릭하기', target: 500, reward: 5000 },
            { id: 'coins', name: '코인 챌린지', description: '10,000 코인 획득하기', target: 10000, reward: 7500 },
            { id: 'upgrades', name: '업그레이드 챌린지', description: '5개 업그레이드 구매하기', target: 5, reward: 10000 },
            { id: 'level', name: '레벨 챌린지', description: '3레벨 올리기', target: 3, reward: 15000 },
            { id: 'income', name: '수익 챌린지', description: '초당 50코인 달성하기', target: 50, reward: 12000 }
        ];

        this.init();
    }

    init() {
        this.loadGame();
        this.initializeDailyChallenge();
        this.calculateOfflineEarnings();
        this.updateDisplay();
        this.setupEventListeners();
        this.startGameLoop();
        this.renderShop();
        this.renderAchievements();
        this.renderSkillTree();
        this.renderDailyChallenge();
        this.renderStatistics();
    }

    setupEventListeners() {
        document.getElementById('mineButton').addEventListener('click', () => this.mine());
        document.getElementById('saveButton').addEventListener('click', () => this.saveGame());
        document.getElementById('loadButton').addEventListener('click', () => this.loadGame());
        document.getElementById('resetButton').addEventListener('click', () => this.resetGame());
        document.getElementById('adButton').addEventListener('click', () => this.watchAd());
        
        // Add prestige button if it exists
        const prestigeButton = document.getElementById('prestigeButton');
        if (prestigeButton) {
            prestigeButton.addEventListener('click', () => this.prestige());
        }
    }

    mine() {
        let reward = this.gameState.clickReward * this.gameState.multiplier;
        
        // Apply prestige bonuses
        reward *= this.gameState.prestige.bonuses.clickMultiplier;
        
        // Apply skill bonuses
        const clickPowerBonus = 1 + (this.gameState.skillTree.skills.clickPower.level * 0.1);
        reward *= clickPowerBonus;
        
        // Critical click chance
        const criticalChance = this.gameState.skillTree.skills.criticalClick.level * 0.05;
        const luckyChance = this.gameState.skillTree.skills.luckyChance.level * 0.05;
        
        if (Math.random() < criticalChance + luckyChance) {
            const criticalMultiplier = 2 + (this.gameState.skillTree.skills.criticalClick.level * 0.25);
            reward *= criticalMultiplier;
            this.showNotification(`크리티컬 클릭! x${criticalMultiplier.toFixed(1)}배!`);
        }
        
        this.gameState.coins += reward;
        this.gameState.totalCoinsEarned += reward;
        this.gameState.totalClicks++;
        
        // Experience gain with skill bonus
        let expGain = 1;
        const expBonus = 1 + (this.gameState.skillTree.skills.experienceGain.level * 0.2);
        expGain *= expBonus * this.gameState.prestige.bonuses.experienceMultiplier;
        this.gameState.experience += expGain;

        this.createCoinEffect(reward);
        this.checkLevelUp();
        this.checkAchievements();
        this.updateDailyChallenge('clicks', 1);
        this.updateStatistics();
        this.updateDisplay();
    }

    createCoinEffect(amount) {
        const effect = document.createElement('div');
        effect.className = 'coin-effect';
        effect.textContent = `+${this.formatNumber(amount)}`;
        effect.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
        
        // Create sparkles for big amounts
        if (amount > 1000) {
            for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = (Math.random() * 200 - 100) + 'px';
                sparkle.style.top = (Math.random() * 200 - 100) + 'px';
                sparkle.style.animationDelay = (Math.random() * 0.5) + 's';
                document.getElementById('miningEffects').appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        }
        
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
        
        // New achievements
        if (!achievements.firstPrestige.completed && this.gameState.prestige.level >= 1) {
            this.completeAchievement('firstPrestige');
        }
        
        if (!achievements.skillMaster.completed && this.isSkillMaster()) {
            this.completeAchievement('skillMaster');
        }
        
        if (!achievements.dailyWarrior.completed && this.gameState.dailyChallenge.totalCompleted >= 10) {
            this.completeAchievement('dailyWarrior');
        }
    }
    
    isSkillMaster() {
        return Object.values(this.gameState.skillTree.skills).every(skill => skill.level >= skill.maxLevel);
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
            this.gameState.statistics.totalAchievementsUnlocked++;
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
            
            // Update statistics
            this.gameState.statistics.totalUpgradesBought++;
            
            // Grant skill points based on upgrade tier
            const tierBonuses = {
                quantum: 2, spaceMiner: 3, aiMiner: 4, timeMiner: 5, dimensionMiner: 6
            };
            const skillPoints = tierBonuses[upgradeKey] || 1;
            this.gameState.skillTree.availablePoints += skillPoints;
            
            this.calculateCoinsPerSecond();
            this.checkAchievements();
            this.updateDailyChallenge('upgrades', 1);
            this.updateStatistics();
            this.updateDisplay();
            this.renderShop();
            this.renderSkillTree();
            
            this.showNotification(`${this.upgradeData[upgradeKey].name} 구매 완료!`);
            
            // Special achievement checks for new upgrades
            if (upgradeKey === 'spaceMiner' && upgrade.count === 1) {
                this.completeAchievement('spaceExplorer');
            }
            if (upgradeKey === 'timeMiner' && upgrade.count === 1) {
                this.completeAchievement('timeTraveler');
            }
            if (upgradeKey === 'dimensionMiner' && upgrade.count === 1) {
                this.completeAchievement('dimensionHopper');
            }
        }
    }

    calculateCoinsPerSecond() {
        let total = 0;
        Object.keys(this.gameState.upgrades).forEach(key => {
            const upgrade = this.gameState.upgrades[key];
            total += upgrade.count * upgrade.baseIncome;
        });
        
        // Apply prestige bonuses
        total *= this.gameState.prestige.bonuses.incomeMultiplier;
        
        // Apply skill bonuses
        const incomeBonus = 1 + (this.gameState.skillTree.skills.incomeBoost.level * 0.15);
        total *= incomeBonus;
        
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
        
        // Update prestige information
        const prestigeLevelElement = document.getElementById('prestigeLevel');
        if (prestigeLevelElement) {
            prestigeLevelElement.textContent = this.gameState.prestige.level;
        }
        
        const prestigePointsElement = document.getElementById('prestigePoints');
        if (prestigePointsElement) {
            prestigePointsElement.textContent = this.gameState.prestige.prestigePoints;
        }
        
        const skillPointsElement = document.getElementById('skillPoints');
        if (skillPointsElement) {
            skillPointsElement.textContent = this.gameState.skillTree.availablePoints;
        }
        
        // Update prestige button
        const prestigeButton = document.getElementById('prestigeButton');
        if (prestigeButton) {
            const canPrestige = this.canPrestige();
            const prestigePoints = this.calculatePrestigePoints();
            prestigeButton.textContent = canPrestige ? 
                `🌟 프레스티지 (+${prestigePoints} 포인트)` : 
                '🔒 프레스티지 (레벨 50 필요)';
            prestigeButton.disabled = !canPrestige;
        }
        
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

    // Prestige System
    canPrestige() {
        return this.gameState.level >= 50 && this.gameState.totalCoinsEarned >= 1000000;
    }

    calculatePrestigePoints() {
        if (!this.canPrestige()) return 0;
        return Math.floor(Math.sqrt(this.gameState.totalCoinsEarned / 1000000));
    }

    prestige() {
        if (!this.canPrestige()) {
            this.showNotification('프레스티지 조건을 만족하지 않습니다!');
            return;
        }
        
        const points = this.calculatePrestigePoints();
        this.gameState.prestige.prestigePoints += points;
        this.gameState.prestige.totalPrestigePoints += points;
        this.gameState.prestige.level++;
        this.gameState.prestige.totalResets++;
        
        // Reset game state but keep prestige
        const prestigeData = { ...this.gameState.prestige };
        const statisticsData = { ...this.gameState.statistics };
        
        this.gameState = {
            ...this.gameState,
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
                quantum: { count: 0, cost: 330000000, baseIncome: 44000 },
                spaceMiner: { count: 0, cost: 5000000000, baseIncome: 200000 },
                aiMiner: { count: 0, cost: 100000000000, baseIncome: 1000000 },
                timeMiner: { count: 0, cost: 2000000000000, baseIncome: 5000000 },
                dimensionMiner: { count: 0, cost: 50000000000000, baseIncome: 25000000 }
            },
            prestige: prestigeData,
            statistics: statisticsData
        };
        
        this.updatePrestigeBonuses();
        this.showNotification(`프레스티지 완료! +${points} 프레스티지 포인트!`);
        this.checkAchievements();
        this.updateDisplay();
        this.renderShop();
        this.renderAchievements();
    }

    updatePrestigeBonuses() {
        const level = this.gameState.prestige.level;
        this.gameState.prestige.bonuses = {
            clickMultiplier: 1 + (level * 0.1),
            incomeMultiplier: 1 + (level * 0.05),
            experienceMultiplier: 1 + (level * 0.15),
            offlineEarningsMultiplier: 1 + (level * 0.25)
        };
    }

    // Skill Tree System
    canUpgradeSkill(skillKey) {
        const skill = this.gameState.skillTree.skills[skillKey];
        return skill.level < skill.maxLevel && 
               this.gameState.skillTree.availablePoints >= skill.cost;
    }

    upgradeSkill(skillKey) {
        const skill = this.gameState.skillTree.skills[skillKey];
        if (this.canUpgradeSkill(skillKey)) {
            this.gameState.skillTree.availablePoints -= skill.cost;
            skill.level++;
            this.showNotification(`${this.skillData[skillKey].name} 스킬 업그레이드!`);
            this.renderSkillTree();
            this.checkAchievements();
        }
    }

    renderSkillTree() {
        const skillTreeContainer = document.getElementById('skillTreeGrid');
        if (!skillTreeContainer) return;
        
        skillTreeContainer.innerHTML = '';
        
        Object.keys(this.gameState.skillTree.skills).forEach(key => {
            const skill = this.gameState.skillTree.skills[key];
            const skillInfo = this.skillData[key];
            
            const skillItem = document.createElement('div');
            skillItem.className = `skill-item ${this.canUpgradeSkill(key) ? 'available' : 'disabled'}`;
            skillItem.innerHTML = `
                <div class="skill-header">
                    <span class="skill-name">${skillInfo.icon} ${skillInfo.name}</span>
                    <span class="skill-level">${skill.level}/${skill.maxLevel}</span>
                </div>
                <div class="skill-description">${skillInfo.description}</div>
                <div class="skill-cost">💎 ${skill.cost} 포인트</div>
            `;
            
            skillItem.addEventListener('click', () => this.upgradeSkill(key));
            skillTreeContainer.appendChild(skillItem);
        });
    }

    // Daily Challenge System
    initializeDailyChallenge() {
        const today = new Date().toDateString();
        const lastReset = new Date(this.gameState.dailyChallenge.lastReset).toDateString();
        
        if (today !== lastReset) {
            this.gameState.dailyChallenge.lastReset = Date.now();
            this.gameState.dailyChallenge.completed = false;
            this.gameState.dailyChallenge.currentChallenge = 
                this.dailyChallenges[Math.floor(Math.random() * this.dailyChallenges.length)];
            this.gameState.dailyChallenge.progress = 0;
        }
    }

    updateDailyChallenge(type, amount) {
        const challenge = this.gameState.dailyChallenge;
        if (challenge.completed || !challenge.currentChallenge) return;
        
        if (challenge.currentChallenge.id === type) {
            challenge.progress = (challenge.progress || 0) + amount;
            
            if (challenge.progress >= challenge.currentChallenge.target) {
                challenge.completed = true;
                challenge.streak++;
                challenge.totalCompleted++;
                this.gameState.coins += challenge.currentChallenge.reward;
                this.showNotification(`일일 도전 완료! +${this.formatNumber(challenge.currentChallenge.reward)} 코인!`);
                this.checkAchievements();
            }
            
            this.renderDailyChallenge();
        }
    }

    renderDailyChallenge() {
        const challengeContainer = document.getElementById('dailyChallengeContainer');
        if (!challengeContainer) return;
        
        const challenge = this.gameState.dailyChallenge;
        if (!challenge.currentChallenge) return;
        
        const progress = Math.min(challenge.progress || 0, challenge.currentChallenge.target);
        const percentage = (progress / challenge.currentChallenge.target) * 100;
        
        challengeContainer.innerHTML = `
            <div class="daily-challenge ${challenge.completed ? 'completed' : ''}">
                <div class="challenge-header">
                    <span class="challenge-name">🎯 ${challenge.currentChallenge.name}</span>
                    <span class="challenge-reward">💰 ${this.formatNumber(challenge.currentChallenge.reward)}</span>
                </div>
                <div class="challenge-description">${challenge.currentChallenge.description}</div>
                <div class="challenge-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="progress-text">${progress}/${challenge.currentChallenge.target}</span>
                </div>
                <div class="challenge-streak">연속 완료: ${challenge.streak}회</div>
            </div>
        `;
    }

    // Statistics System
    updateStatistics() {
        const stats = this.gameState.statistics;
        stats.totalPlayTime = Date.now() - stats.gameStartTime;
        stats.maxCoinsPerSecond = Math.max(stats.maxCoinsPerSecond, this.gameState.coinsPerSecond);
        stats.maxLevel = Math.max(stats.maxLevel, this.gameState.level);
        stats.totalPrestigeResets = this.gameState.prestige.totalResets;
        stats.lastPlayTime = Date.now();
    }

    calculateOfflineEarnings() {
        const now = Date.now();
        const timeDiff = now - this.gameState.statistics.lastPlayTime;
        const offlineTime = Math.min(timeDiff, 8 * 60 * 60 * 1000); // Max 8 hours
        
        if (offlineTime > 5 * 60 * 1000 && this.gameState.coinsPerSecond > 0) { // Min 5 minutes
            const offlineEarnings = (this.gameState.coinsPerSecond * offlineTime / 1000) * 
                                   this.gameState.prestige.bonuses.offlineEarningsMultiplier *
                                   (1 + this.gameState.skillTree.skills.offlineEarnings.level * 0.5);
            
            this.gameState.coins += offlineEarnings;
            this.gameState.statistics.offlineEarnings += offlineEarnings;
            this.showNotification(`오프라인 수익: +${this.formatNumber(offlineEarnings)} 코인!`);
        }
    }

    renderStatistics() {
        const statsContainer = document.getElementById('statisticsContainer');
        if (!statsContainer) return;
        
        const stats = this.gameState.statistics;
        const playTime = new Date(stats.totalPlayTime).toISOString().substr(11, 8);
        
        statsContainer.innerHTML = `
            <div class="statistics-grid">
                <div class="stat-item">
                    <span class="stat-label">총 플레이 시간</span>
                    <span class="stat-value">${playTime}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">최대 초당 수익</span>
                    <span class="stat-value">${this.formatNumber(stats.maxCoinsPerSecond)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">최대 레벨</span>
                    <span class="stat-value">${stats.maxLevel}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">총 업그레이드 구매</span>
                    <span class="stat-value">${stats.totalUpgradesBought}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">총 프레스티지 리셋</span>
                    <span class="stat-value">${stats.totalPrestigeResets}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">오프라인 수익</span>
                    <span class="stat-value">${this.formatNumber(stats.offlineEarnings)}</span>
                </div>
            </div>
        `;
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
                this.updateDailyChallenge('coins', this.gameState.coinsPerSecond / 10);
                this.updateDisplay();
            }
            
            // Auto-clicker from skills
            const autoClickChance = this.gameState.skillTree.skills.autoClicker.level * 0.05;
            if (Math.random() < autoClickChance) {
                this.mine();
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
                
                // Initialize missing new features
                if (!this.gameState.prestige) {
                    this.gameState.prestige = {
                        level: 0,
                        totalResets: 0,
                        prestigePoints: 0,
                        totalPrestigePoints: 0,
                        bonuses: {
                            clickMultiplier: 1,
                            incomeMultiplier: 1,
                            experienceMultiplier: 1,
                            offlineEarningsMultiplier: 1
                        }
                    };
                }
                
                if (!this.gameState.skillTree) {
                    this.gameState.skillTree = {
                        availablePoints: 0,
                        skills: {
                            clickPower: { level: 0, maxLevel: 20, cost: 1 },
                            autoClicker: { level: 0, maxLevel: 10, cost: 2 },
                            incomeBoost: { level: 0, maxLevel: 15, cost: 1 },
                            experienceGain: { level: 0, maxLevel: 10, cost: 3 },
                            offlineEarnings: { level: 0, maxLevel: 5, cost: 5 },
                            luckyChance: { level: 0, maxLevel: 8, cost: 4 },
                            criticalClick: { level: 0, maxLevel: 12, cost: 3 }
                        }
                    };
                }
                
                if (!this.gameState.dailyChallenge) {
                    this.gameState.dailyChallenge = {
                        lastReset: 0,
                        currentChallenge: null,
                        completed: false,
                        streak: 0,
                        totalCompleted: 0,
                        progress: 0
                    };
                }
                
                if (!this.gameState.statistics) {
                    this.gameState.statistics = {
                        totalPlayTime: 0,
                        gameStartTime: Date.now(),
                        lastPlayTime: Date.now(),
                        maxCoinsPerSecond: 0,
                        maxLevel: 1,
                        totalUpgradesBought: 0,
                        totalAchievementsUnlocked: 0,
                        totalPrestigeResets: 0,
                        offlineEarnings: 0
                    };
                }
                
                // Add new upgrades if they don't exist
                if (!this.gameState.upgrades.spaceMiner) {
                    this.gameState.upgrades.spaceMiner = { count: 0, cost: 5000000000, baseIncome: 200000 };
                }
                if (!this.gameState.upgrades.aiMiner) {
                    this.gameState.upgrades.aiMiner = { count: 0, cost: 100000000000, baseIncome: 1000000 };
                }
                if (!this.gameState.upgrades.timeMiner) {
                    this.gameState.upgrades.timeMiner = { count: 0, cost: 2000000000000, baseIncome: 5000000 };
                }
                if (!this.gameState.upgrades.dimensionMiner) {
                    this.gameState.upgrades.dimensionMiner = { count: 0, cost: 50000000000000, baseIncome: 25000000 };
                }
                
                // Add new achievements if they don't exist
                const newAchievements = {
                    firstPrestige: { completed: false, reward: 50000 },
                    skillMaster: { completed: false, reward: 25000 },
                    dailyWarrior: { completed: false, reward: 15000 },
                    spaceExplorer: { completed: false, reward: 100000 },
                    timeTraveler: { completed: false, reward: 500000 },
                    dimensionHopper: { completed: false, reward: 1000000 }
                };
                
                Object.keys(newAchievements).forEach(key => {
                    if (!this.gameState.achievements[key]) {
                        this.gameState.achievements[key] = newAchievements[key];
                    }
                });
                
                this.updatePrestigeBonuses();
                this.calculateCoinsPerSecond();
                this.updateDisplay();
                this.renderShop();
                this.renderAchievements();
                this.renderSkillTree();
                this.renderDailyChallenge();
                this.renderStatistics();
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