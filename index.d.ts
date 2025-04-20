import {
    Message,
    TextBasedChannel,
    MessagePayload,
    MessageCreateOptions
} from 'discord.js'

type BasicMessageData = {
    id: string
    content: string
    author: {
        id: string
        username: string
        discriminator: string
        avatar?: string | null
    }
    channelId: string
    guildId?: string
    timestamp: string
    editedTimestamp?: string | null
}


type GenericLogEditCallback = (data: any) => void

type PlayerChatCallback = (data: PlayerChatCallbackParams) => void
type TellrawCallback = (data: MessageBase) => void
type DeathCallback = (data: MessageBase) => void
type JoinCallback = (data: PlayerBase) => void
type LeaveCallback = (data: LeaveCallbackParams) => void
type KicksCallback = (data: KicksCallbackParams) => void

type MessageCallback = (message: BasicMessageData) => void

interface LogCategory<T extends (...args: any) => void = GenericLogEditCallback> {
    edit(cb: T): void
}

interface MessageBase {
    message: string
}

interface PlayerBase {
    username: string
    xuid: string
    pfpLink: string
}

interface PlayerChatCallbackParams extends PlayerBase, MessageBase { }

interface LeaveCallbackParams extends PlayerBase {
    timePlayed: number
}

interface KicksCallbackParams extends PlayerBase {
    timePlayed: number
    reason: string
    extraReason: {
        reasonType: string
        reason: string
    }
}

interface Logs {
    playerChat: LogCategory<PlayerChatCallback>
    tellraw: LogCategory<TellrawCallback>
    deaths: LogCategory<DeathCallback>
    joins: LogCategory<JoinCallback>
    leaves: LogCategory<LeaveCallback>
    kicks: LogCategory<KicksCallback>
}


/**
 * 
 * @param cb The function to be executed when a message is recieved
 */
declare function onMessage(cb: MessageCallback): void
/**
 * Sends a message to a specified channel
 * 
 * @param message The message to send to the channel. Can be a string, MessagePayload, or MessageCreateOptions
 * @param channel The channel where the message will be sent
 */
declare function sendMessage(
    message: string | MessagePayload | MessageCreateOptions,
    channel: TextBasedChannel
): void

declare const logs: Logs
/**
 * The channel id where the join command was executed in
 */
declare const channelId: string
/**
 * The id of the discord server that this bot is linked to
 */
declare const guildId: string