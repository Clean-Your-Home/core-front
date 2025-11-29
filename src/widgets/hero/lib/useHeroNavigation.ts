import { useScrollIntoView } from '@/shared/lib/hooks';

export const useHeroNavigation = () => {
  const { ref, trigger } = useScrollIntoView<HTMLElement>({
    immediately: false,
    behavior: 'smooth',
    block: 'start',
  });

  const handleLearnMoreClick = (event: React.MouseEvent) => {
    event.preventDefault();

    const servicesElement = document.querySelector(
      '#services',
    ) as HTMLElement | null;

    if (servicesElement && ref.current) {
      ref.current = servicesElement;
      trigger();
    }
  };

  return {
    handleLearnMoreClick,
  };
};
