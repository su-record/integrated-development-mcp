import { z } from 'zod';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const timers = new Map();
const scheduledTasks = new Map();

export const timeTools = {
  set_timer: {
    description: '타이머 설정',
    parameters: z.object({
      name: z.string().describe('타이머 이름'),
      duration: z.number().describe('시간 (분)'),
      message: z.string().optional().describe('완료 메시지'),
    }),
    handler: async (args: any) => {
      const { name, duration, message = '타이머 완료!' } = args;
      
      if (timers.has(name)) {
        clearTimeout(timers.get(name));
      }
      
      const timer = setTimeout(() => {
        console.log(`⏰ ${name}: ${message}`);
        timers.delete(name);
      }, duration * 60 * 1000);
      
      timers.set(name, timer);
      
      return {
        success: true,
        message: `✅ 타이머 '${name}' 설정됨 (${duration}분)`,
        endTime: dayjs().add(duration, 'minute').format('HH:mm:ss'),
      };
    },
  },
  
  get_timezone: {
    description: '시간대 변환',
    parameters: z.object({
      time: z.string().optional().describe('변환할 시간'),
      from: z.string().default('UTC').describe('출발 시간대'),
      to: z.string().describe('도착 시간대'),
    }),
    handler: async (args: any) => {
      const { time, from, to } = args;
      
      const sourceTime = time ? dayjs.tz(time, from) : dayjs().tz(from);
      const targetTime = sourceTime.tz(to);
      
      return {
        success: true,
        original: {
          time: sourceTime.format('YYYY-MM-DD HH:mm:ss'),
          timezone: from,
        },
        converted: {
          time: targetTime.format('YYYY-MM-DD HH:mm:ss'),
          timezone: to,
        },
      };
    },
  },
};
