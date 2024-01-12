import { readPreState } from '@changesets/pre'
import readChangesets from '@changesets/read'
import * as core from '@actions/core'
export default async function hasChangesets(
  cwd: string = process.cwd()
): Promise<boolean> {
  const preState = await readPreState(cwd)
  const changesets = await readChangesets(cwd)
  core.debug(`readPreState value: ${JSON.stringify(preState)}`)
  core.debug(`readChangesets value: ${JSON.stringify(changesets)}`)
  if (preState?.mode === 'pre') {
    const changesetsToFilter = new Set(preState.changesets)
    return changesets.filter(x => !changesetsToFilter.has(x.id)).length > 0
  } else {
    return changesets.length > 0
  }
}
