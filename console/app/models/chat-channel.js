import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import { format, formatDistanceToNow, isValid as isValidDate } from 'date-fns';

export default class ChatChannel extends Model {
    /** @ids */
    @attr('string') public_id;
    @attr('string') company_uuid;

    /** @attributes */
    @attr('string') name;
    @attr('string') slug;
    @attr('array') meta;

    /** @relationships */
    @hasMany('chat-participant', { async: false }) participants;
    @hasMany('chat-message', { async: false }) messages;
    @hasMany('chat-attachment', { async: true }) attachments;
    @hasMany('chat-presence', { async: true }) presences;
    @belongsTo('chat-message', { async: false }) lastMessage;

    /** @dates */
    @attr('date') created_at;
    @attr('date') updated_at;

    /** @computed */
    @computed('updated_at') get updatedAgo() {
        if (!isValidDate(this.updated_at)) {
            return null;
        }

        return formatDistanceToNow(this.updated_at);
    }

    @computed('updated_at') get updatedAt() {
        if (!isValidDate(this.updated_at)) {
            return null;
        }

        return formatDate(this.updated_at, 'PP HH:mm');
    }

    @computed('created_at') get createdAgo() {
        if (!isValidDate(this.created_at)) {
            return null;
        }

        return formatDistanceToNow(this.created_at);
    }

    @computed('created_at') get createdAt() {
        if (!isValidDate(this.created_at)) {
            return null;
        }

        return formatDate(this.created_at, 'PP HH:mm');
    }
}
