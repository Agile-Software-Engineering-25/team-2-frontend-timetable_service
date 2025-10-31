import { NotificationServiceClient } from './NotificationServiceClient.ts';
import { getGroups } from '@/api/getGroups.ts';

type RecipientSpec = {
  users?: string[];
  groups?: string[];
};

export class EventNotificationService {
  constructor(private readonly client: NotificationServiceClient) {}

  private async resolveRecipients(
    recipients: RecipientSpec
  ): Promise<RecipientSpec> {
    const { groups } = await getGroups();

    const resolvedUsers: string[] = [];
    const usedGroups: string[] = [];

    for (const group of groups) {
      if (recipients.groups?.includes(group.name)) {
        usedGroups.push(group.name);
        const uuids = group.students.map((s) => s.uuid).filter(Boolean);
        resolvedUsers.push(...uuids);
      }
    }

    return {
      users: [...(recipients.users || []), ...resolvedUsers],
      groups: [], // oder usedGroups, falls dein Backend Gruppen kennt
    };
  }

  async notifyEventCreation(title: string, recipients: RecipientSpec) {
    const resolved = await this.resolveRecipients(recipients);

    return this.client.post('/notifications', {
      ...resolved,
      title: `Neu: ${title}`,
      message: `Die Veranstaltung "${title}" wurde neu erstellt.`,
      notifyType: 'All',
      notificationType: 'Info',
    });
  }

  async notifyEventUpdate(
    title: string,
    message: string,
    recipients: RecipientSpec
  ) {
    const resolved = await this.resolveRecipients(recipients);

    return this.client.post('/notifications', {
      ...resolved,
      title: `Aktualisiert: ${title}`,
      message: message || `Die Veranstaltung "${title}" wurde aktualisiert.`,
      notifyType: 'All',
      notificationType: 'Info',
    });
  }

  async notifyEventComment(
    title: string,
    comment: string,
    recipients: RecipientSpec
  ) {
    const resolved = await this.resolveRecipients(recipients);

    return this.client.post('/notifications', {
      ...resolved,
      title: `Kommentar zu: ${title}`,
      message: comment,
      notifyType: 'UI',
      notificationType: 'None',
    });
  }

  async notifyEventCancellation(title: string, recipients: RecipientSpec) {
    const resolved = await this.resolveRecipients(recipients);

    return this.client.post('/notifications', {
      ...resolved,
      title: `Abgesagt: ${title}`,
      message: `Die Veranstaltung "${title}" wurde abgesagt.`,
      notifyType: 'All',
      notificationType: 'Warning',
    });
  }
}
