import { differenceInDays, parseISO, isFuture, isToday } from 'date-fns'

export const getStatusBadge = (dateStr: string) => {
  if (!dateStr) return null

  const date = parseISO(dateStr)
  
  // Check if it's a valid date object
  if (isNaN(date.getTime())) {
    return { label: dateStr, color: 'bg-white/5' } // Return raw text if not a date
  }

  if (isToday(date)) {
    return { label: 'LIVE TODAY', color: 'bg-red-500 animate-pulse' }
  }

  if (isFuture(date)) {
    const days = differenceInDays(date, new Date())
    if (days <= 7) return { label: `LIVE IN ${days} ${days === 1 ? 'DAY' : 'DAYS'}`, color: 'bg-[--color-create-blue]' }
    return { label: dateStr, color: 'bg-white/10' }
  }

  return { label: 'PAST EVENT', color: 'bg-white/5 text-white/40' }
}