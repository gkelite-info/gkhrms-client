"use client"

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react"
import { ChatConversation, ChatMessage } from "../types"
import { MOCK_OLDER_BATCH_1 } from "./mockOlderChatHistory"

export function useChatPagination(conversation: ChatConversation, isVisible: boolean = true) {
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>(conversation.messages)
  const [isLoadingOlder, setIsLoadingOlder] = useState(false)
  const [hasMoreOlder, setHasMoreOlder] = useState(true)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const prevScrollHeightRef = useRef<number>(0)
  const isPrependingRef = useRef(false)
  const prevConvIdRef = useRef<string>(conversation.id)
  const canLoadOlderRef = useRef(false)
  const isInitialMountRef = useRef(true)

  const snapToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      const el = messagesContainerRef.current
      el.scrollTop = el.scrollHeight
    }
  }, [])

  useLayoutEffect(() => {
    if (isVisible) {
      snapToBottom()
    }
  }, [conversation.id, isVisible, snapToBottom])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      if (container.clientHeight > 0 && isInitialMountRef.current && isVisible) {
        container.scrollTop = container.scrollHeight
        isInitialMountRef.current = false
      }
    })

    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [conversation.id, isVisible])

  useEffect(() => {
    const container = messagesContainerRef.current

    if (conversation.id !== prevConvIdRef.current || isVisible) {
      if (conversation.id !== prevConvIdRef.current) {
        prevConvIdRef.current = conversation.id
        setDisplayedMessages(conversation.messages)
        setHasMoreOlder(true)
        setIsLoadingOlder(false)
      }

      canLoadOlderRef.current = false
      isInitialMountRef.current = true

      if (container) {
        container.scrollTop = container.scrollHeight
      }

      const raf1 = requestAnimationFrame(() => {
        if (container) container.scrollTop = container.scrollHeight
        const raf2 = requestAnimationFrame(() => {
          if (container) container.scrollTop = container.scrollHeight
        })
        return () => cancelAnimationFrame(raf2)
      })

      const t = setTimeout(() => {
        if (container) container.scrollTop = container.scrollHeight
        canLoadOlderRef.current = true
      }, 250)

      return () => {
        cancelAnimationFrame(raf1)
        clearTimeout(t)
      }
    }

    setDisplayedMessages((prev) => {
      const existingIds = new Set(prev.map((m) => m.id))
      const newItems = conversation.messages.filter((m) => !existingIds.has(m.id))
      if (newItems.length === 0) return prev
      return [...prev, ...newItems]
    })

    requestAnimationFrame(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        })
      }
    })
  }, [conversation.id, conversation.messages, isVisible])

  useEffect(() => {
    if (isPrependingRef.current && messagesContainerRef.current && prevScrollHeightRef.current) {
      const newScrollHeight = messagesContainerRef.current.scrollHeight
      messagesContainerRef.current.scrollTop = newScrollHeight - prevScrollHeightRef.current
      isPrependingRef.current = false
    }
  }, [displayedMessages])

  const loadOlderMessages = useCallback(() => {
    if (isLoadingOlder || !hasMoreOlder) return
    setIsLoadingOlder(true)

    if (messagesContainerRef.current) {
      prevScrollHeightRef.current = messagesContainerRef.current.scrollHeight
    }
    isPrependingRef.current = true

    setTimeout(() => {
      setDisplayedMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id))
        const newBatch = MOCK_OLDER_BATCH_1.filter((m) => !existingIds.has(m.id))
        return [...newBatch, ...prev]
      })
      setIsLoadingOlder(false)
      setHasMoreOlder(false)
    }, 600)
  }, [isLoadingOlder, hasMoreOlder])

  const handleScroll = useCallback(() => {
    if (!canLoadOlderRef.current || !messagesContainerRef.current || isLoadingOlder || !hasMoreOlder) return
    const container = messagesContainerRef.current
    if (container.scrollHeight <= container.clientHeight + 40) return
    if (container.scrollTop < 35) {
      loadOlderMessages()
    }
  }, [isLoadingOlder, hasMoreOlder, loadOlderMessages])

  return {
    displayedMessages,
    isLoadingOlder,
    hasMoreOlder,
    messagesContainerRef,
    handleScroll,
  }
}
