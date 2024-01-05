// 单岛动画
export const WOOD_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/WOOD_isand.json'

export const WIND_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/wind_isand.json'

export const WATER_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/WATER_isand.json'

export const SOIL_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/Soil_isand.json'

export const ICE_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/ICE_island.json'

export const GOLD_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/GOLD_isand.json'

export const FLASH_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/FLASH_island.json'

export const FIRE_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/fire_isand.json'

// 背景动画
export const BG_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/BG.json'

// 开奖动画
export const WIN_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230330/914c3fa24b42b66ec286f08e3d89a3b7/play.json'

// 开奖云层动画
export const CLOUDS_SPINE =
  'https://activity.hdslb.com/blackboard/static/20230320/914c3fa24b42b66ec286f08e3d89a3b7/play_cloud.json'

export const EGG_SPINE = 'https://activity.hdslb.com/blackboard/static/70bb422013eb4692db31a31f5240742d/caidan.json'
export const EGG_SPINE_LOCAL = '/src/assets/caidan/caidan.json'
export const MYSTERY_CONFIG = [
  {
    rollIndex: 2,
    id: 1,
    name: '森之岛',
    anim: WOOD_SPINE,
    multiple: 5,
    x: 237,
    y: 337,
    normal: 'WOOD_01',
    selected: 'WOOD_03',
    rolling: 'WOOD_02',
    style: {
      left: 184,
      top: 286,
      width: 116,
      height: 123
    }
  },
  {
    rollIndex: 3,
    id: 2,
    name: '千风岛',
    anim: WIND_SPINE,
    multiple: 10,
    x: 309,
    y: 459,
    normal: 'wind_01',
    selected: 'wind_03',
    rolling: 'wind_02',
    style: {
      left: 260,
      top: 415,
      width: 105,
      height: 87
    }
  },
  {
    rollIndex: 0,
    id: 3,
    name: '兰溪岛',
    anim: WATER_SPINE,
    multiple: 5,
    x: 228,
    y: 163,
    normal: 'WATER_01',
    selected: 'WATER_03',
    rolling: 'WATER_02',
    style: {
      left: 165,
      top: 105,
      width: 117,
      height: 146
    }
  },
  {
    rollIndex: 4,
    id: 4,
    name: '流金岛',
    anim: SOIL_SPINE,
    multiple: 5,
    x: 175,
    y: 488,
    normal: 'SOIL_01',
    selected: 'SOIL_03',
    rolling: 'SOIL_02',
    style: {
      left: 127,
      top: 403,
      width: 100,
      height: 150
    }
  },
  {
    rollIndex: 7,
    id: 5,
    name: '寒冰岛',
    anim: ICE_SPINE,
    multiple: 15,
    x: 74,
    y: 122,
    normal: 'ICE_01',
    selected: 'ICE_03',
    rolling: 'ICE_02',
    style: {
      left: 27,
      top: 85,
      width: 85,
      height: 85
    }
  },
  {
    rollIndex: 5,
    id: 6,
    name: '巨石岛',
    anim: GOLD_SPINE,
    multiple: 25,
    x: 72,
    y: 396,
    normal: 'GOLD_01',
    selected: 'GOLD_03',
    rolling: 'GOLD_02',
    style: {
      left: 27,
      top: 360,
      width: 80,
      height: 90
    }
  },
  {
    rollIndex: 6,
    id: 7,
    name: '雷光岛',
    anim: FLASH_SPINE,
    multiple: 5,
    x: 95,
    y: 269,
    normal: 'FLASH_01',
    selected: 'FLASH_03',
    rolling: 'FLASH_02',
    style: {
      left: 32,
      top: 202,
      width: 118,
      height: 150
    }
  },
  {
    rollIndex: 1,
    id: 8,
    name: '烈炎岛',
    anim: FIRE_SPINE,
    multiple: 45,
    x: 316,
    y: 250,
    normal: 'FIRE_01',
    selected: 'FIRE_03',
    rolling: 'FIRE_02',
    style: {
      left: 285,
      top: 204,
      width: 70,
      height: 95
    }
  }
]