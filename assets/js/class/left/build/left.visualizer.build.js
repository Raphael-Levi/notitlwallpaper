// import METHOD from '../method/left.visualizer.method.js'

class LeftVisulizerBuild{
    constructor(){
        this.style = {opacity: '0', animation: 'none'}

        this.canvasWrap = document.querySelector('.left-player-visualizer')
        const {width, height} = this.canvasWrap.getBoundingClientRect()

        this.canvas = document.querySelector('.left-player-visualizer > canvas')
        this.canvas.width = width
        this.canvas.height = height

        this.ctx = this.canvas.getContext('2d')

        this.param = {
            count: 128,
            step: 100,
            gap: 0.2,
            smooth: 4,
            // rd: 0.8,
            color: '50, 234, 255',
            audioDecrease: 0.98,
            audioIncrease: 0.02,
            peakValue: 0.2
        }

        this.w = Array.from({length: this.param.count}, () => 0)
        this.index = Array.from({length: this.param.count}, (_, i) => i)
        // this.play = false
        // this.noise = [1.1760367470305, 0.85207379418243, 0.68842437227852, 0.63767902570829, 0.5452348949654, 0.50723325864167, 0.4677726234682, 0.44204182748767, 0.41956517802157, 0.41517375040002, 0.41312118577934, 0.40618363960446, 0.39913707474975, 0.38207008614508, 0.38329789106488, 0.37472136606245, 0.36586428412968, 0.37603017335105, 0.39762590761573, 0.39391828858591, 0.37930603769622, 0.39433365764563, 0.38511504613859, 0.39082579241834, 0.3811852720504, 0.40231453727161, 0.40244151133175, 0.39965366884521, 0.39761103827545, 0.51136400422212, 0.66151212038954, 0.66312205226679, 0.7416276690995, 0.74614971301133, 0.84797007577483, 0.8573583910469, 0.96382997811663, 0.99819377577185, 1.0628692615814, 1.1059083969751, 1.1819808497335, 1.257092297208, 1.3226521464753, 1.3735992532905, 1.4953223705889, 1.5310064942373, 1.6193923584808, 1.7094805527135, 1.7706604552218, 1.8491987941428, 1.9238418849406, 2.0141596921333, 2.0786429508827, 2.1575522518646, 2.2196355526005, 2.2660112509705, 2.320762171749, 2.3574848254513, 2.3986127976537, 2.4043566176474, 2.4280476777842, 2.3917477397336, 2.4032522546622, 2.3614180150678]

        this.init()
    }


    init(){
        // if(window.wallpaperAudioListener){
        //     window.wallpaperRegisterAudioListener((audioArray) => this.wallpaperAudioListener(audioArray))
        // }else{
        //     this.play = true
        // }

        window.wallpaperRegisterAudioListener((audioArray) => this.wallpaperAudioListener(audioArray))
    }


    // open
    open(){
        this.style.animation = `blank 0.05s 3 ${Math.random()}s linear forwards`
    }


    // resize
    resize(){
        this.canvasWrap = document.querySelector('.left-player-visualizer')
        const {width, height} = this.canvasWrap.getBoundingClientRect()

        this.canvas = document.querySelector('.left-player-visualizer > canvas')
        this.canvas.width = width
        this.canvas.height = height
    }


    wallpaperAudioListener(audioData){
        const {width, height} = this.canvasWrap.getBoundingClientRect()
        const data = LeftVisualizerMethod.addPinkNoise({audioData, ...this.param})
        const buffer = data.map(e => e * width)
        // const sample = LeftVisualizerMethod.createStepAudioBuffer({data, ...this.param})
        // const buffer = LeftVisualizerMethod.createAudioBuffer({sample: data, index: this.index, width, height, ...this.param})
        LeftVisualizerMethod.drawCanvas1({ctx: this.ctx, ...this.param, width, height, buffer, w: this.w})
    }


    // animate
    // animate(){
    // animate(){
    //     if(!this.play) return
    //     // const {audioData} = player
    //     // if(!audioData) return

    //     // const {width, height} = this.canvas.getBoundingClientRect()
    //     // const sample = LeftVisualizerMethod.createStepAudioBuffer({data: audioData, ...this.param})
    //     // const buffer = LeftVisualizerMethod.createAudioBuffer({sample, index: this.index, height, ...this.param})

    //     const {width, height} = this.canvasWrap.getBoundingClientRect()
    //     const time = window.performance.now()
    //     const buffer = Array.from({length: this.param.count}, (_, i) => {
    //         const n = SIMPLEX.noise2D(i * 0.06, time * 0.0005)
    //         const p = PUBLIC_METHOD.normalize(n, 0, 1, -1, 1)
    //         return p * width * 0.75
    //     })
        
    //     LeftVisualizerMethod.drawCanvas2({ctx: this.ctx, ...this.param, width, height, buffer})
    // }
}