import { readPreState } from '@changesets/pre'
import readChangesets from '@changesets/read'

export default async function hasChangesets(
  cwd: string = process.cwd()
): Promise<boolean> {
  const preState = await readPreState(cwd)
  if (preState?.mode === 'pre') {
    const changesets = await readChangesets(cwd)
    const changesetsToFilter = new Set(preState.changesets)
    return changesets.filter(x => !changesetsToFilter.has(x.id)).length > 0
  }
  return false
}
