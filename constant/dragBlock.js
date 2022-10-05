export const dynamicComponent = {
  button: 'AtomsButton',
  paragraph: 'AtomsParagraph'
}

export const blockData = {
  COMPONENT: 'component',
  PROPSDATA: 'propsData',
  ID: 'id'
}

export const propsData = {
  MESSAGE: 'message',
  TEXT: 'text'
}

export const mapData = {
  [blockData.COMPONENT]: 'tag',
  [blockData.PROPSDATA]: 'propsData',
  [blockData.ID]: 'id',
}

export const componentMapProps = {
  [dynamicComponent.button]: ['text', 'message'],
  [dynamicComponent.paragraph]: ['text']
}