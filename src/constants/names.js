export const KAHOOT_NAMES = [
    'SpeedyNoodle','CosmicPanda','NeonWaffle','LazyRocket',
    'BoldSushi','PixelNinja','FrostyTaco','ZappyLlama',
    'GoldenMochi','SilverFox','CrimsonOwl','TurboSloth',
    'MysticBagel','NovaSeal','ChaoticPug','WildDumpling',
    'SwiftCorgi','BlazeHedgehog','StormyKoala','LuckyPanda',
    'EchoWaffle','RadiantCrab','VelvetMoose','ZengoGhost',
    'CoolNarwhal','FluffyQuasar','SpunkyDragon','TinyBullet',
    'PrismaticToad','BraveCookie','GloomyLobster','JazzyUnicorn',
    'WarpedKoala','SneakyBambi','TurboRaccoon','CrypticOtter',
    'FierceYokai','ChilledKitsune','HyperTofu','MightyMochi',
];

export function getRandomName() {
    return KAHOOT_NAMES[Math.floor(Math.random() * KAHOOT_NAMES.length)];
}
