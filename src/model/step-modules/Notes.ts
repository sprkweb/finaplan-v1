import i18n from '@/i18n'

export type NotesOptions = { text: string }

export const defaultOptions: NotesOptions = {
  text: i18n.t('stepModules.notes.defaultText') as string
}
