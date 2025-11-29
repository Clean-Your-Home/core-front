'use client';

import type { HookTarget } from '@/shared/utils/lib';

import { useRef } from 'react';

import { isTarget } from '@/shared/utils/lib';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect';
import {
  StateRef as StateReference,
  useRefState as useReferenceState,
} from '../useRefState/useRefState';

/** The scroll into view options type */
export interface UseScrollIntoViewOptions extends ScrollIntoViewOptions {
  /** Whether to immediately the scroll into view */
  immediately?: boolean;
}

/** The scroll into view return type */
export interface UseScrollIntoViewReturn {
  /** Function to scroll element into view */
  trigger: (parameters?: {
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
  }) => void;
}

export interface UseScrollIntoView {
  <Target extends Element>(
    options?: UseScrollIntoViewOptions,
    target?: never,
  ): UseScrollIntoViewReturn & { ref: StateReference<Target> };

  (
    target?: HookTarget,
    options?: UseScrollIntoViewOptions,
  ): UseScrollIntoViewReturn;
}

/**
 * @name useScrollIntoView
 * @description - Hook that provides functionality to scroll an element into view
 * @category Sensors
 * @usage low
 *
 * @overload
 * @param {HookTarget} [target=window] The target element to scroll into view
 * @param {boolean} [options.immediately=true] Whether to scroll immediately
 * @param {ScrollBehavior} [options.behavior='smooth'] The scrolling behavior
 * @param {ScrollLogicalPosition} [options.block='start'] The vertical alignment
 * @param {ScrollLogicalPosition} [options.inline='nearest'] The horizontal alignment
 * @returns {UseScrollIntoViewReturn} Object containing scroll function
 *
 * @example
 * const { trigger } = useScrollIntoView(ref);
 *
 * @overload
 * @template Target The target element
 * @param {boolean} [options.immediately=true] Whether to scroll immediately
 * @param {ScrollBehavior} [options.behavior='smooth'] The scrolling behavior
 * @param {ScrollLogicalPosition} [options.block='start'] The vertical alignment
 * @param {ScrollLogicalPosition} [options.inline='nearest'] The horizontal alignment
 * @returns {UseScrollIntoViewReturn & { ref: StateRef<Target> }} Object containing scroll function and ref
 *
 * @example
 * const { ref, trigger } = useScrollIntoView<HTMLDivElement>();
 */
export const useScrollIntoView = ((...parameters: any[]) => {
  const target = (isTarget(parameters[0]) ? parameters[0] : undefined) as
    | HookTarget
    | undefined;
  const options = (target ? parameters[1] : parameters[0]) as
    | UseScrollIntoViewOptions
    | undefined;

  const internalReference = useReferenceState<Element>();
  const {
    behavior = 'smooth',
    block = 'start',
    inline = 'nearest',
    immediately = true,
  } = options ?? {};
  const elementReference = useRef<Element>(null);

  useIsomorphicLayoutEffect(() => {
    if (!immediately) return;
    if (!target && !internalReference.state) return;

    const element =
      ((target
        ? isTarget.getElement(target)
        : internalReference.current) as Element) ?? globalThis;

    elementReference.current = element;

    element.scrollIntoView({
      behavior,
      block,
      inline,
    });
  }, [target, internalReference.state]);

  const trigger = (parameters_?: {
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
  }) => {
    if (!elementReference.current) return;

    const { behavior, block, inline } = parameters_ ?? {};

    elementReference.current.scrollIntoView({
      behavior,
      block,
      inline,
    });
  };

  if (target) return { trigger };
  return { ref: internalReference, trigger };
}) as UseScrollIntoView;
