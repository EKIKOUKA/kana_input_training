new Vue({
    el: '#app',
    data() {
        return {
            exerciseType: [
                {
                    label: "仮名",
                    value: 0
                }, {
                    label: "単語",
                    value: 1
                }, {
                    label: "文章",
                    value: 2
                }
            ],
            exerciseTypeIndex: parseInt(localStorage.getItem("exerciseTypeIndex")) || 0,
            wordsArray: [],
            words_selected_item: "",

            hiraganaKeys: [
                [{ character: 'ぬ', weight: 100, initialWeight: 100 }, { character: 'ふ', weight: 10, initialWeight: 10 }, { character: 'あ', weight: 10, initialWeight: 10 }, { character: 'う', weight: 10, initialWeight: 10 }, { character: 'え', weight: 50, initialWeight: 50 }, { character: 'お', weight: 100, initialWeight: 100 }, { character: 'や', weight: 50, initialWeight: 50 }, { character: 'ゆ', weight: 50, initialWeight: 50 }, { character: 'よ', weight: 100, initialWeight: 100 }, { character: 'わ', weight: 100, initialWeight: 100 }, { character: 'を', weight: 100, initialWeight: 100 }, { character: 'ほ', weight: 100, initialWeight: 100 }, { character: 'へ', weight: 200, initialWeight: 200 }, { character: 'ー', weight: 200, initialWeight: 200 }],
                [{ character: 'た', weight: 10, initialWeight: 10 }, { character: 'て', weight: 10, initialWeight: 10 }, { character: 'い', weight: 10, initialWeight: 10 }, { character: 'す', weight: 10, initialWeight: 10 }, { character: 'か', weight: 50, initialWeight: 50 }, { character: 'ん', weight: 30, initialWeight: 30 }, { character: 'な', weight: 10, initialWeight: 10 }, { character: 'に', weight: 10, initialWeight: 10 }, { character: 'ら', weight: 10, initialWeight: 10 }, { character: 'せ', weight: 10, initialWeight: 10 }],
                [{ character: 'ち', weight: 10, initialWeight: 10 }, { character: 'と', weight: 10, initialWeight: 10 }, { character: 'し', weight: 10, initialWeight: 10 }, { character: 'は', weight: 10, initialWeight: 10 }, { character: 'き', weight: 50, initialWeight: 50 }, { character: 'く', weight: 50, initialWeight: 50 }, { character: 'ま', weight: 10, initialWeight: 10 }, { character: 'の', weight: 10, initialWeight: 10 }, { character: 'り', weight: 50, initialWeight: 50 }, { character: 'れ', weight: 30, initialWeight: 30 }, { character: 'け', weight: 50, initialWeight: 50 }, { character: 'む', weight: 100, initialWeight: 100 }],
                [{ character: 'つ', weight: 10, initialWeight: 10 }, { character: 'さ', weight: 50, initialWeight: 50 }, { character: 'そ', weight: 50, initialWeight: 50 }, { character: 'ひ', weight: 10, initialWeight: 10 }, { character: 'こ', weight: 50, initialWeight: 50 }, { character: 'み', weight: 50, initialWeight: 50 }, { character: 'も', weight: 10, initialWeight: 10 }, { character: 'ね', weight: 10, initialWeight: 10 }, { character: 'る', weight: 30, initialWeight: 30 }, { character: 'め', weight: 50, initialWeight: 50 }, { character: 'ろ', weight: 100, initialWeight: 100 }]
            ],
            katakanaKeys: [
                [{ character: 'ヌ', weight: 100, initialWeight: 100 }, { character: 'フ', weight: 10, initialWeight: 10 }, { character: 'ア', weight: 10, initialWeight: 10 }, { character: 'ウ', weight: 10, initialWeight: 10 }, { character: 'エ', weight: 50, initialWeight: 50 }, { character: 'オ', weight: 100, initialWeight: 100 }, { character: 'ヤ', weight: 50, initialWeight: 50 }, { character: 'ユ', weight: 50, initialWeight: 50 }, { character: 'ヨ', weight: 100, initialWeight: 100 }, { character: 'ワ', weight: 100, initialWeight: 100 }, { character: 'ヲ', weight: 100, initialWeight: 100 }, { character: 'ホ', weight: 100, initialWeight: 100 }, { character: 'ヘ', weight: 200, initialWeight: 200 }, { character: 'ー', weight: 200, initialWeight: 200 }],
                [{ character: 'タ', weight: 10, initialWeight: 10 }, { character: 'テ', weight: 10, initialWeight: 10 }, { character: 'イ', weight: 10, initialWeight: 10 }, { character: 'ス', weight: 10, initialWeight: 10 }, { character: 'カ', weight: 50, initialWeight: 50 }, { character: 'ン', weight: 30, initialWeight: 30 }, { character: 'ナ', weight: 10, initialWeight: 10 }, { character: 'ニ', weight: 10, initialWeight: 10 }, { character: 'ラ', weight: 10, initialWeight: 10 }, { character: 'セ', weight: 10, initialWeight: 10 }],
                [{ character: 'チ', weight: 10, initialWeight: 10 }, { character: 'ト', weight: 10, initialWeight: 10 }, { character: 'シ', weight: 10, initialWeight: 10 }, { character: 'ハ', weight: 10, initialWeight: 10 }, { character: 'キ', weight: 50, initialWeight: 50 }, { character: 'ク', weight: 50, initialWeight: 50 }, { character: 'マ', weight: 10, initialWeight: 10 }, { character: 'ノ', weight: 10, initialWeight: 10 }, { character: 'リ', weight: 50, initialWeight: 50 }, { character: 'レ', weight: 30, initialWeight: 30 }, { character: 'ケ', weight: 50, initialWeight: 50 }, { character: 'ム', weight: 100, initialWeight: 100 }],
                [{ character: 'ツ', weight: 10, initialWeight: 10 }, { character: 'サ', weight: 50, initialWeight: 50 }, { character: 'ソ', weight: 50, initialWeight: 50 }, { character: 'ヒ', weight: 10, initialWeight: 10 }, { character: 'コ', weight: 50, initialWeight: 50 }, { character: 'ミ', weight: 50, initialWeight: 50 }, { character: 'モ', weight: 10, initialWeight: 10 }, { character: 'ネ', weight: 10, initialWeight: 10 }, { character: 'ル', weight: 30, initialWeight: 30 }, { character: 'メ', weight: 50, initialWeight: 50 }, { character: 'ロ', weight: 100, initialWeight: 100 }]
            ],
            currentKeys: [],
            currentKana: '',
            kana_mode: true, // 片仮名モード
            simple_mode: true, // 初心者モード
            weight_show: false, // 重さ値を表示
            largeMode: false, // 巨大モード
            audioContext: null, // AudioContext
            correctSound: [
                {
                    label: "効果音１",
                    value: 0,
                    url: './resource/key_sound_01.wav',
                    buffer: null
                },
                {
                    label: "効果音２",
                    value: 1,
                    url: './resource/key_sound_02.wav',
                    buffer: null
                },
                {
                    label: "トライトーン",
                    value: 2,
                    url: './resource/トライトーン.wav',
                    buffer: null
                }
            ],
            correctSoundSelected: 0,
            errorSound: {
                url: './resource/エラー.wav'
            },

            words: {},
            input_word: "",
            textarea: ""
        }
    },
    async created() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log("audioContext: ", this.audioContext)
        for (let sound of this.correctSound) {
            sound.buffer = await this.loadSound(sound.url);
        }
        this.errorSound.buffer = await this.loadSound(this.errorSound.url);
    },
    mounted() {
        this.currentKeys = this.kana_mode ? this.katakanaKeys : this.hiraganaKeys;

        if (this.exerciseTypeIndex === 0) {
            this.generateRandomHiragana();
            window.addEventListener('keydown', this.handleRubyInput)
        }
        else if (this.exerciseTypeIndex === 1) window.addEventListener('keydown', this.handleWordInput)

        console.log("KanaWords: ", KanaWords)
        Object.keys(KanaWords).forEach(item => {
            this.wordsArray.push({
                label: KanaWords[item].title,
                value: item
            })
        })
        if (!this.words_selected_item) this.words_selected_item = localStorage.getItem("words_selected_item") || this.wordsArray[0].value

        localStorage.setItem("words_selected_item", this.words_selected_item);
        localStorage.setItem("words_selected_item_length", JSON.stringify(KanaWords[localStorage.getItem("words_selected_item")].words.length));
        this.words = KanaWords[localStorage.getItem("words_selected_item")].words[parseInt(localStorage.getItem(`words_selected_${this.words_selected_item}_index`)) || 0]
        console.log("Sentence: ", Sentence)
    },
    beforeDestroy() {
        if (this.exerciseTypeIndex === 0) window.removeEventListener('keydown', this.handleRubyInput)
        else if (this.exerciseTypeIndex === 1) window.removeEventListener('keydown', this.handleWordInput)
    },
    methods: {
        async loadSound(url) {
            const res = await fetch(url);
            const arrayBuffer = await res.arrayBuffer();
            return await this.audioContext.decodeAudioData(arrayBuffer);
        },
        playCorrectSound() {
            const sound = this.correctSound[this.correctSoundSelected];
            if (!sound || !sound.buffer) return;

            const source = this.audioContext.createBufferSource();
            source.buffer = sound.buffer;
            source.connect(this.audioContext.destination);
            source.start(0);
        },
        playErrorSound() {
            if (!this.errorSound.buffer) return;

            const source = this.audioContext.createBufferSource();
            source.buffer = this.errorSound.buffer;
            source.connect(this.audioContext.destination);
            source.start(0);
        },
        exerciseTypeChange(e) {
            localStorage.setItem("exerciseTypeIndex", e);
            if (e === 0) {
                this.generateRandomHiragana();
                window.removeEventListener('keydown', this.handleWordInput)
                window.addEventListener('keydown', this.handleRubyInput)
            } else if (e === 1) {
                this.currentKana = ''
                window.removeEventListener('keydown', this.handleRubyInput)
                window.addEventListener('keydown', this.handleWordInput)
            }
        },
        wordsItemChange() {
            localStorage.setItem("words_selected_item", this.words_selected_item);
            localStorage.setItem("words_selected_item_length", KanaWords[localStorage.getItem("words_selected_item")].words.length);
            this.words = KanaWords[localStorage.getItem("words_selected_item")].words[parseInt(localStorage.getItem(`words_selected_${this.words_selected_item}_index`)) || 0]
        },
        correctSoundChange() {
            this.playCorrectSound();
        },

        normalizeKana(s) {
            return s ? s.normalize('NFKC') : '';
        },
        isKana(ch) {
            const cp = ch.codePointAt(0);
            return (
                (cp >= 0x3040 && cp <= 0x309F) || // Hiragana
                (cp >= 0x30A0 && cp <= 0x30FF) || // Katakana（含「ー」）
                (cp >= 0x31F0 && cp <= 0x31FF)    // Katakana Phonetic Extensions
            );
        },
        handleWordInput(event) {
            if (event.key === "Escape" && this.largeMode) this.largeMode = false

            if (event.key === "Backspace") {
                const normalized = this.normalizeKana(this.input_word);
                const chars = Array.from(normalized);
                chars.pop();
                this.input_word = chars.join('');
                return;
            }

            // IMEの組字におけるキーまたは仮想キーをスキップ
            if (event.isComposing || event.key === 'Process') return;

            // 今回の入力を一段のテキストとして正規化してください（例：'しゅし゛ん' -> 'しゅじん'）
            const chunk = this.normalizeKana(event.key);
            if (!chunk) return;

            // 制御文字をフィルタリングする
            if (chunk.length === 1 && chunk.charCodeAt(0) < 0x20) return;

            // 許容される仮名を逐語的に追加する
            for (const ch of chunk) {
                if (this.isKana(ch)) this.input_word += ch;
            }
            this.input_word = this.normalizeKana(this.input_word);
            // 両辺を先に正規化してから比較する
            const targetWord = this.normalizeKana(this.words.ruby || '');
            const inputWord = this.normalizeKana(this.input_word);

            if (inputWord === targetWord) {
                let words_selected_item = `words_selected_${this.words_selected_item}_index`
                let words_selected_index = localStorage.getItem(words_selected_item)

                this.playCorrectSound(); // 正確効果音を再生
                this.input_word = "";
                if (words_selected_index >= KanaWords[localStorage.getItem("words_selected_item")].words.length - 1) {
                    this.$message({message: "終わり、お疲れ様でした!", type: "success", duration: 90000});
                    setTimeout(() => {
                        if (confirm("進度をリセットしますか？")) {
                            this.words = KanaWords[localStorage.getItem("words_selected_item")].words[0]
                            localStorage.setItem(`words_selected_${this.words_selected_item}_index`, 0);
                        }
                    }, 1000)
                    return
                }
                words_selected_index++;
                localStorage.setItem(`words_selected_${this.words_selected_item}_index`, words_selected_index);
                this.words = KanaWords[localStorage.getItem("words_selected_item")].words[words_selected_index]
            } else {
                // this.$message({message: this.input_word, type: "info"})
            }
        },
        handleSentenceInput(event) {
            // console.log("event.key: ", event.key)
        },
        focusin() {
            // window.removeEventListener('keydown', this.handleInput)
        },
        focusout() {
            // window.addEventListener('keydown', this.handleInput)
        },
        switchKanaMode() {
            // kana_modeに応じて配列の値を切り替える
            this.currentKeys = this.kana_mode ? this.katakanaKeys : this.hiraganaKeys;
            this.generateRandomHiragana();
        },
        generateRandomHiragana() {
            const flatKeys = this.currentKeys.flat()

            // 総重さを計算
            const totalWeight = flatKeys.reduce((sum, key) => sum + key.weight, 0)
            // 0から総重みまでの乱数を生成する
            let randomValue = Math.random() * totalWeight
            let lastHiragana = this.currentKana; // 最後の平仮名を記録する
            // 仮名のループ処理と重みに基づく選択
            for (let key of flatKeys) {
                randomValue -= key.weight

                if (randomValue <= 0 && key.character !== lastHiragana) {
                    this.currentKana = key.character
                    return
                }
            }
        },

        handleRubyInput(event) {
            if (event.key === "Escape" && this.largeMode) this.largeMode = false

            // 全ての仮名文字を一つの配列に抽出する
            const allHiragana = this.hiraganaKeys.flat().map(k => k.character)
            console.log("event.key", event.key)
            if (event.key === "Backspace") this.input_word = this.input_word.slice(0, -1)
            // キー入力が仮名の場合のみ比較する
            if (allHiragana.includes(event.key)) {
                let currentKey = this.currentKeys.flat().find(k => k.character === this.currentKana)

                // kana_mode
                let index = this.hiraganaKeys.flat().findIndex(k => k.character === event.key)
                let char_hiraToKana = this.katakanaKeys.flat()[index].character

                const isCorrectInput = this.kana_mode ? char_hiraToKana === this.currentKana : event.key === this.currentKana
                if (isCorrectInput) {
                    this.playCorrectSound();

                    // 正しい場合は、仮名の重みを減らす
                    const minWeight = currentKey.initialWeight * 0.5
                    currentKey.weight = Math.max(currentKey.weight * 0.7, minWeight)
                    this.generateRandomHiragana()
                } else {
                    this.playErrorSound();
                    // 入力が間違っている場合は、現在の仮名の重みを増やします
                    currentKey.weight *= 2 // 間違った後に重みを追加

                    this.$message({
                        message: '間違いました！',
                        type: "error",
                        offset: 100,
                        duration: 500
                    })
                }
            }
        }
    }
})
