import { ESLintUtils, TSESTree } from '@typescript-eslint/utils'
// import { TSESTree } from '@typescript-eslint/utils/dist/ts-eslint'

const createRule = ESLintUtils.RuleCreator((name) => name)
const RequireWatchCleanup = 'requireWatchCleanup'

const rule = createRule({
  name: 'require-watch-cleanup',
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure watchers are cleaned up on component unmount',
      recommended: 'error'
    },
    schema: [], // 不需要参数,
    messages: {
      [RequireWatchCleanup]: 'Watchers must be cleaned up on component unmount.'
    }
  },
  defaultOptions: [],
  create(context) {
    return {
      'CallExpression[callee.name="watch"], CallExpression[callee.name="watchEffect"]'(
        node: TSESTree.CallExpression
      ) {
        const parent = context.getAncestors().pop()

        if (parent && parent.type === 'ArrowFunctionExpression' && parent.async) {
          context.report({
            node,
            messageId: RequireWatchCleanup
          })
        }
      },
      'CallExpression[callee.name="onUnmounted"]'(node: TSESTree.CallExpression) {
        const { parent } = context.getScope().block
        if (parent?.type === 'ArrowFunctionExpression' && parent.async) {
          context.report({
            node,
            messageId: RequireWatchCleanup
          })
        }
      }
    }
  }
})

export default rule
