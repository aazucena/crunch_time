
export const retrieveSound = async(name) => {
    switch(name) {
        case 'lullaby':
            return (await import('../assets/audio/baby-lullaby-loop.mp3')).default
        case 'outlast':
            return (await import('../assets/audio/dr-rick-trager-chase-theme-outlast.mp3')).default
        case 'metal_gear_solid':
            return (await import('../assets/audio/metal-gear-solid-snake-1-theme.mp3')).default
        case 'mission_impossible':
            return (await import('../assets/audio/mission-impossible-theme.mp3')).default
        case 'mr_x':
            return (await import('../assets/audio/resident-evil-2-remake-ost-mr-x-theme.mp3')).default
        case 'persona_5':
            return (await import('../assets/audio/run-run-run-persona-5.mp3')).default
        case 'spongebob_1':
            return (await import('../assets/audio/spongebob-grass-skirt-chase.mp3')).default
        case 'spongebob_2':
            return (await import('../assets/audio/spongebob-twelfth-street-rag.mp3')).default
        case 'super_mario_64':
            return (await import('../assets/audio/super-mario-64-slider.mp3')).default
        case 'undertale':
            return (await import('../assets/audio/undertale-run.mp3')).default
        case 'left_4_dead':
            return (await import('../assets/audio/witch-left-4-dead.mp3')).default
        case 'yakety_sax':
            return (await import('../assets/audio/yakety-sax-music.mp3')).default
        case 'sad-trombone':
            return (await import('../assets/audio/sad-trombone.mp3')).default
        default:
            break
    }

}