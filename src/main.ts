import * as core from '@actions/core'
import hasChangesets from './has-changesets'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Checking for changesets`)

    const result = await hasChangesets()
    core.debug(`Changesets found: ${result}`)
    core.setOutput('hasChangesets', result.toString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
