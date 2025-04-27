import { TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Skeleton } from './ui/skeleton'

export const TransactionsSkeleton = () => {
  return (
    <TableBody>
      {Array(7)
        .fill(0)
        .map((txn, index) => (
          <TableRow key={`skeleton ${index}`}>
            <TableCell className="font-medium">
              <Skeleton className="w-[107px] h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-16 h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-12 h-4" />
            </TableCell>
            <TableCell className="text-right flex items-end w-full justify-end">
              <Skeleton className="w-12 h-4" />
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  )
}
