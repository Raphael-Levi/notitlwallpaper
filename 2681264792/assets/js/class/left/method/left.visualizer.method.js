// import Spline from '../../../lib/cubic-spline.js'

const LeftVisualizerMethod = {
    createStepAudioBuffer({data, count, step}){
        const temp = []

        for(let i = 0; i < count; i++){
            temp.push(data[i * step])
        }

        return temp
    },
    createAudioBuffer({sample = [], index = [], smooth = 0.1, boost = 1, width, rd = 1.0}){
        const len = sample.length
        const temp = []

        const xs = index
        const ys = sample
        const spline = new Spline(xs, ys)
        
        for(let i = 0; i < len; i++){
            temp.push(spline.at(i * smooth) * boost * width)
        }

        const avg = temp.reduce((x, y) => x + y) / len * rd
        return temp.map(e => Math.max(0, e - avg))
        // return temp
        // return temp.map(e => PUBLIC_METHOD.normalize(e, 0, width, 0, 255))
    },
    addPinkNoise({audioData, audioDecrease = 0.98, audioIncrease = 0.02, peakValue = 0.2}){
        let max = 0
        const data = []
        const finalProcessing = []
        
        for(let i = 0; i < audioData.length; i++){
            const samp = ((audioData[i] + audioData[i + 1]) / 2) ** 2
            data.push(samp)
            
            if(data[i] > max) max = data[i]
        }

        peakValue = peakValue * audioDecrease + max * audioIncrease

        for(let i = 0; i < data.length; i++){
            data[i] /= peakValue

            if(data[i] > 1.0){
                data[i] = 1.0
            }
        }

        for (let i = 0; i < data.length; i++){
            if(i == 0 || i == data.length - 1){
                finalProcessing[i] = data[i]
            }else{
                finalProcessing[i] = (data[i - 1] * 2 + data[i] * 3 + data[i + 1] * 2) / 7
            }
        }

        // for (var i = 0; i < 64; i++) {
        //     data[i] /= pinkNoise[i]
        //     data[i + 64] /= pinkNoise[i]
        // }

        return finalProcessing
    },
    drawCanvas1({ctx, color, count, buffer, width, height, gap, smooth, w}){
        const g = (height * gap) / (count - 1)
        const size = (height - height * gap) / count

        ctx.clearRect(0, 0, width, height)

     
        for(let i = 0; i < count; i++){
            const buf = buffer[i]

            if(w[i] < buf) {
                w[i] += (buf - w[i]) / smooth
            } else if (w[i] > buf) {
                w[i] -= (w[i] - buf) / smooth
            }
    
            const alpha = (w[i] / width) * 0.75 + 0.25
            ctx.fillStyle = `rgba(${color}, ${alpha})`
            ctx.fillRect(0, i * size + i * g, w[i], size)
        }
    },
    drawCanvas2({ctx, color, count, buffer, width, height, gap}){
        const g = (height * gap) / (count - 1)
        const size = (height - height * gap) / count

        ctx.clearRect(0, 0, width, height)

        for(let i = 0; i < count; i++){
            const buf = buffer[i]

            const alpha = (buf / width) * 0.75 + 0.25
            ctx.fillStyle = `rgba(${color}, ${alpha})`
            ctx.fillRect(0, i * size + i * g, buf, size)
        }
    }
}