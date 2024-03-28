import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

class Format {
  dayMMDDYYYY = (date: string) => {
    return dayjs(date).format('MM/DD/YYYY');
  };
  dayMMDDYYYYHHMM = (date: string) => {
    return dayjs(date).format('MM/DD/YYYY HH:mm');
  };
  dayFromNow = (date: number | string) => {
    return dayjs(date).fromNow(true);
  };
  isSameDay(
    currentMessage: TMessage,
    diffMessage?: TMessage | null | undefined,
  ) {
    if (!diffMessage || !diffMessage.createdAt) {
      return false;
    }

    const currentCreatedAt = dayjs(currentMessage.createdAt);
    const diffCreatedAt = dayjs(diffMessage.createdAt);

    const ms = Math.abs(currentCreatedAt.valueOf() - diffCreatedAt.valueOf());
    return ms < 1800000;
  }
  isSameUser(
    currentMessage: TMessage,
    diffMessage: TMessage | null | undefined,
  ) {
    return !!(
      diffMessage &&
      diffMessage.sender.fullName &&
      currentMessage.sender.fullName &&
      diffMessage.sender._id === currentMessage.sender._id
    );
  }
}
export const _format = new Format();
