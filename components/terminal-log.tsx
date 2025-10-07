"use client"

import { useEffect, useRef, useState } from "react"
import { Coins } from "lucide-react"

type LogLevel = "INFO" | "WARN" | "ALERT" | "crypto"

interface LogEntry {
  level: LogLevel
  message: string
  protocol?: "TCP" | "UDP" | "HTTP"
  source?: string
  target?: string
}

const PLACEHOLDER_LOGS: LogEntry[] = [
  {
    level: "INFO",
    message: "[AUTH-SVC] Service initialized successfully | Port: 8443 | TLS v1.3 enabled",
    protocol: "TCP",
    source: "New York",
    target: "Frankfurt",
  },
  {
    level: "crypto",
    message: "[CRYPTO] Suspicious contract call detected | Contract: 0xAB**7f2c | Method: transferFrom | Gas: 210000",
    source: "Singapore",
    target: "London",
  },
  {
    level: "INFO",
    message: "[WEB-01] HTTP/2 request received | Endpoint: /api/v2/auth/login | IP: 45.142.*.123",
    protocol: "HTTP",
    source: "Mumbai",
    target: "New York",
  },
  {
    level: "crypto",
    message: "[CRYPTO] Wallet probe detected | Address: 0xCD**9a1b | Balance query: 847 ETH | Source: Unknown",
    source: "Tokyo",
    target: "Frankfurt",
  },
  {
    level: "INFO",
    message: "[DB-POOL] Connection pool established | Active: 10/50 | Latency: 12ms",
    protocol: "TCP",
    source: "Frankfurt",
    target: "Singapore",
  },
  {
    level: "WARN",
    message: "[SECURITY] Multiple authentication failures detected | IP: 45.142.*.123 | Attempts: 5 in 90s",
    protocol: "HTTP",
    source: "Mumbai",
    target: "New York",
  },
  {
    level: "crypto",
    message:
      "[CRYPTO] Token transfer attempt | From: 0xEF**3d8a | To: 0x12**bc4f | Amount: 15000 USDT | Status: PENDING",
    source: "New York",
    target: "Singapore",
  },
  {
    level: "INFO",
    message: "[API-GW] Request routed successfully | Path: /api/v2/users | Method: GET | Response: 200",
    protocol: "HTTP",
    source: "London",
    target: "Frankfurt",
  },
  {
    level: "crypto",
    message: "[CRYPTO] Smart contract interaction | Contract: 0x9F**e2d1 | Function: approve | Spender: 0xAB**7f2c",
    source: "Frankfurt",
    target: "Tokyo",
  },
  {
    level: "INFO",
    message: "[SESSION] New session established | User: verified_user_8472 | IP: 203.45.*.45 | Token TTL: 3600s",
    protocol: "TCP",
    source: "Tokyo",
    target: "Singapore",
  },
  {
    level: "WARN",
    message: "[IAM] Privilege escalation attempt | User: admin_temp | Requested: root | Status: DENIED",
    protocol: "HTTP",
    source: "New York",
    target: "London",
  },
  {
    level: "crypto",
    message: "[CRYPTO] Unusual transaction pattern | Wallet: 0x45**8c3e | Txns: 23 in 60s | Total value: 450 ETH",
    source: "London",
    target: "Mumbai",
  },
  {
    level: "INFO",
    message: "[FILE-SVC] Transfer initiated | File: quarterly_report_Q4.pdf | Size: 2.3 MB | Encryption: AES-256",
    protocol: "TCP",
    source: "Singapore",
    target: "Mumbai",
  },
  {
    level: "ALERT",
    message: "[DLP] Anomalous data transfer detected | Volume: 450 MB in 30s | Threshold exceeded by 380%",
    protocol: "TCP",
    source: "Mumbai",
    target: "Frankfurt",
  },
  {
    level: "crypto",
    message: "[CRYPTO] NFT minting activity | Collection: 0x7A**f1b9 | Tokens: 500 | Gas price: 85 gwei | Suspicious",
    source: "Mumbai",
    target: "New York",
  },
  {
    level: "INFO",
    message: "[MONITOR] Network utilization | Bandwidth: 45% | Latency: 23ms | Packet loss: 0.02%",
    protocol: "UDP",
    source: "Frankfurt",
    target: "New York",
  },
  {
    level: "WARN",
    message: "[FIREWALL] Connection attempt blocked | Source: 192.168.*.88 | Port: 22 | Rule: SSH-RESTRICT",
    protocol: "TCP",
    source: "Moscow",
    target: "London",
  },
  {
    level: "INFO",
    message: "[DB-QUERY] Query executed successfully | Table: users | Operation: SELECT | Duration: 12ms | Rows: 1,247",
    protocol: "TCP",
    source: "Singapore",
    target: "Tokyo",
  },
  {
    level: "ALERT",
    message:
      "[IDS] Suspicious outbound connection | Destination: 185.220.*.45 | Port: 9050 | Classification: TOR_EXIT_NODE",
    protocol: "TCP",
    source: "New York",
    target: "Moscow",
  },
  {
    level: "crypto",
    message:
      "[CRYPTO] DeFi protocol interaction | Protocol: Uniswap | Action: Swap | Pair: ETH/USDC | Amount: 12.5 ETH",
    source: "Singapore",
    target: "London",
  },
  {
    level: "INFO",
    message: "[LOAD-BAL] Traffic distribution active | Nodes: 3 | Algorithm: Round-robin | Health: 100%",
    protocol: "HTTP",
    source: "London",
    target: "Frankfurt",
  },
  {
    level: "WARN",
    message: "[RESOURCE] Memory threshold exceeded | Server: web-02 | Usage: 87% | Available: 2.1 GB",
    protocol: "UDP",
    source: "Frankfurt",
    target: "Singapore",
  },
  {
    level: "INFO",
    message: "[BACKUP] Incremental backup started | Target: /data/production | Method: rsync | Compression: enabled",
    protocol: "TCP",
    source: "Tokyo",
    target: "Singapore",
  },
  {
    level: "INFO",
    message: "[MAIL-SVC] Queue processing | Pending: 15 messages | Rate: 3.2 msg/s | Delivery success: 98.7%",
    protocol: "TCP",
    source: "New York",
    target: "London",
  },
  {
    level: "WARN",
    message: "[RATE-LIMIT] API threshold exceeded | Endpoint: /api/v2/data | Client: app_mobile_v2 | Limit: 1000/hr",
    protocol: "HTTP",
    source: "Mumbai",
    target: "Singapore",
  },
  {
    level: "ALERT",
    message: "[IDS] Port scan detected | Source: 78.142.*.201 | Ports scanned: 22,80,443,3306,5432 | Duration: 8s",
    protocol: "TCP",
    source: "Moscow",
    target: "Frankfurt",
  },
  {
    level: "crypto",
    message: "[CRYPTO] Bridge transaction detected | From: Ethereum | To: Polygon | Amount: 2500 USDC | Fee: 0.05 ETH",
    source: "Frankfurt",
    target: "Tokyo",
  },
  {
    level: "INFO",
    message: "[CACHE] Redis performance | Keys: 1,245 | Hit rate: 92.3% | Avg latency: 0.8ms | Memory: 245 MB",
    protocol: "UDP",
    source: "Singapore",
    target: "Tokyo",
  },
  {
    level: "INFO",
    message: "[SESSION] Token expired | User: user_8472 | Duration: 3600s | Reason: TTL_EXCEEDED",
    protocol: "HTTP",
    source: "London",
    target: "New York",
  },
  {
    level: "WARN",
    message: "[CERT] SSL certificate expiration warning | Domain: api.example.com | Days remaining: 14",
    protocol: "TCP",
    source: "Frankfurt",
    target: "London",
  },
  {
    level: "INFO",
    message: "[CDN] Edge distribution active | Locations: 12 | Cache hit ratio: 94.2% | Bandwidth saved: 2.3 TB",
    protocol: "HTTP",
    source: "New York",
    target: "Mumbai",
  },
  {
    level: "ALERT",
    message: "[DB-SECURITY] Unauthorized access attempt | Table: admin_users | User: guest_2847 | Action: BLOCKED",
    protocol: "TCP",
    source: "Moscow",
    target: "Singapore",
  },
  {
    level: "INFO",
    message: "[QUEUE] Job processing statistics | Completed: 234 jobs | Avg time: 1.2s | Success rate: 99.1%",
    protocol: "UDP",
    source: "Tokyo",
    target: "Frankfurt",
  },
  {
    level: "WARN",
    message: "[STORAGE] Disk space warning | Partition: /var/log | Usage: 78% | Available: 44 GB",
    protocol: "UDP",
    source: "Singapore",
    target: "Mumbai",
  },
  {
    level: "INFO",
    message: "[HEALTH] Microservices status check | Services: 8/8 online | Avg response: 45ms | Status: HEALTHY",
    protocol: "HTTP",
    source: "Frankfurt",
    target: "New York",
  },
  {
    level: "INFO",
    message: "[WEBSOCKET] Connection established | Client: 10.0.*.5 | Protocol: WSS | Heartbeat: 30s",
    protocol: "TCP",
    source: "London",
    target: "Tokyo",
  },
  {
    level: "WARN",
    message:
      "[ANOMALY] Unusual login pattern detected | User: corp_admin | IPs: 5 different locations | Timespan: 120s",
    protocol: "HTTP",
    source: "Mumbai",
    target: "London",
  },
  {
    level: "ALERT",
    message:
      "[DLP] Potential data exfiltration | Volume: 2.4 GB | Destination: 185.220.*.45 | Classification: HIGH_RISK",
    protocol: "TCP",
    source: "New York",
    target: "Moscow",
  },
  {
    level: "INFO",
    message:
      "[K8S] Auto-scaling triggered | Service: api-gateway | Current: 3 pods | Target: 6 pods | Reason: CPU > 75%",
    protocol: "HTTP",
    source: "Singapore",
    target: "Frankfurt",
  },
  {
    level: "INFO",
    message: "[SEARCH] Index update completed | Documents: 45,892 | Duration: 8.3s | Index size: 1.2 GB",
    protocol: "TCP",
    source: "Tokyo",
    target: "Singapore",
  },
  {
    level: "WARN",
    message:
      "[PERFORMANCE] API latency degraded | Endpoint: /api/v2/search | Avg: 850ms | Threshold: 500ms | Deviation: +70%",
    protocol: "HTTP",
    source: "Frankfurt",
    target: "Mumbai",
  },
  {
    level: "INFO",
    message: "[PAYMENT] Transaction processed | Gateway: Stripe | Amount: $127.50 | Status: SUCCESS | ID: txn_1a2b3c",
    protocol: "HTTP",
    source: "New York",
    target: "London",
  },
  {
    level: "ALERT",
    message:
      "[MALWARE] Threat detected in upload | File: invoice_final.exe | Signature: Trojan.Generic.KD.12345 | Action: QUARANTINED",
    protocol: "TCP",
    source: "Moscow",
    target: "New York",
  },
  {
    level: "INFO",
    message:
      "[METRICS] Telemetry collection | Endpoints: 24 | Data points: 12,847 | Storage: InfluxDB | Retention: 30d",
    protocol: "UDP",
    source: "London",
    target: "Frankfurt",
  },
  {
    level: "WARN",
    message: "[INTEGRATION] External API timeout | Service: payment-gateway | Duration: 30s | Retry: 1/3",
    protocol: "HTTP",
    source: "Mumbai",
    target: "Tokyo",
  },
  {
    level: "INFO",
    message: "[LOGGING] Aggregation pipeline active | Rate: 1,200 events/s | Storage: Elasticsearch | Indices: 47",
    protocol: "UDP",
    source: "Singapore",
    target: "London",
  },
  {
    level: "INFO",
    message: "[DNS] Query cache statistics | Cached: 3,456 domains | Hit rate: 87.2% | Avg lookup: 2ms",
    protocol: "UDP",
    source: "Frankfurt",
    target: "Tokyo",
  },
  {
    level: "ALERT",
    message:
      "[SECURITY] Brute force attack detected | Target: SSH (port 22) | Source: 78.142.*.201 | Attempts: 847 in 5m",
    protocol: "TCP",
    source: "Moscow",
    target: "Frankfurt",
  },
  {
    level: "INFO",
    message: "[CRON] Scheduled task completed | Job: daily_report_generation | Duration: 23s | Status: SUCCESS",
    protocol: "HTTP",
    source: "New York",
    target: "Singapore",
  },
  {
    level: "WARN",
    message: "[REDIS] Connection pool exhausted | Active: 50/50 | Queued requests: 12 | Avg wait: 340ms",
    protocol: "TCP",
    source: "Tokyo",
    target: "Mumbai",
  },
  {
    level: "INFO",
    message:
      "[MEDIA] Image processing completed | Files: 12 | Operations: resize, optimize | Total size: 8.4 MB → 2.1 MB",
    protocol: "HTTP",
    source: "London",
    target: "Singapore",
  },
  {
    level: "INFO",
    message: "[OAUTH] Token refresh successful | Client: app_mobile_v2 | Grant type: refresh_token | Expires: 3600s",
    protocol: "HTTP",
    source: "Frankfurt",
    target: "New York",
  },
  {
    level: "ALERT",
    message: "[WAF] SQL injection attempt blocked | Parameter: user_id | Pattern: ' OR '1'='1 | Source: 185.220.*.45",
    protocol: "HTTP",
    source: "Moscow",
    target: "London",
  },
  {
    level: "WARN",
    message: "[SERVICE-MESH] Circuit breaker opened | Service: payment-service | Failure rate: 52% | Timeout: 60s",
    protocol: "TCP",
    source: "Mumbai",
    target: "Frankfurt",
  },
  {
    level: "INFO",
    message:
      "[ANALYTICS] Event processing pipeline | Ingested: 8,234 events | Processed: 8,201 | Failed: 33 | Success: 99.6%",
    protocol: "UDP",
    source: "Singapore",
    target: "Tokyo",
  },
  {
    level: "INFO",
    message: "[PUSH] Notification delivery | Platform: FCM | Devices: 1,024 | Success: 1,019 | Failed: 5 | Rate: 99.5%",
    protocol: "UDP",
    source: "New York",
    target: "Mumbai",
  },
  {
    level: "WARN",
    message:
      "[DEPRECATION] Legacy API endpoint accessed | Path: /v1/legacy/users | Client: web_app_v1 | Sunset date: 2025-12-31",
    protocol: "HTTP",
    source: "London",
    target: "Frankfurt",
  },
  {
    level: "ALERT",
    message:
      "[IAM] Privilege escalation detected | User: guest_2847 | Attempted role: admin | Method: JWT_MANIPULATION | Status: BLOCKED",
    protocol: "HTTP",
    source: "Moscow",
    target: "Singapore",
  },
]

interface TerminalLogProps {
  isPlaying: boolean
  speed: number
  onReset: boolean
  onLogsUpdate?: (logs: LogEntry[]) => void
  onNewConnection?: (source: string, target: string, level: LogLevel) => void
}

export function TerminalLog({ isPlaying, speed, onReset, onLogsUpdate, onNewConnection }: TerminalLogProps) {
  const [displayedLogs, setDisplayedLogs] = useState<LogEntry[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)
  const previousLogCountRef = useRef(0)

  useEffect(() => {
    if (onReset) {
      setDisplayedLogs([])
      currentIndexRef.current = 0
      previousLogCountRef.current = 0
    }
  }, [onReset])

  useEffect(() => {
    if (onLogsUpdate && displayedLogs.length > 0 && displayedLogs.length !== previousLogCountRef.current) {
      previousLogCountRef.current = displayedLogs.length
      onLogsUpdate(displayedLogs)
    }
  }, [displayedLogs]) // Only depend on displayedLogs, not the function

  useEffect(() => {
    if (!isPlaying) return

    const baseInterval = 1200
    const interval = setInterval(() => {
      if (currentIndexRef.current < PLACEHOLDER_LOGS.length) {
        const logToAdd = PLACEHOLDER_LOGS[currentIndexRef.current]
        if (logToAdd) {
          setDisplayedLogs((prev) => [...prev, logToAdd])
          if (logToAdd.source && logToAdd.target && onNewConnection) {
            onNewConnection(logToAdd.source, logToAdd.target, logToAdd.level)
          }
        }
        currentIndexRef.current++
      }
    }, baseInterval / speed)

    return () => clearInterval(interval)
  }, [isPlaying, speed, onNewConnection])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayedLogs])

  const getLogColor = (level: LogLevel) => {
    switch (level) {
      case "INFO":
        return "text-green-400"
      case "WARN":
        return "text-green-300"
      case "ALERT":
        return "text-green-500"
      case "crypto":
        return "text-green-400"
    }
  }

  return (
    <div className="h-[500px] flex flex-col">
      <h2 className="font-mono text-sm font-bold text-green-400 mb-3 border-b border-green-500/30 pb-2 tracking-wider">
        LIVE EVENT STREAM
      </h2>
      <div
        ref={scrollRef}
        className="flex-1 font-mono text-xs overflow-y-auto space-y-1.5 bg-black p-4 rounded-lg border border-green-500/20 custom-scrollbar"
      >
        {displayedLogs.filter(Boolean).map((log, index) => (
          <div
            key={index}
            className={`${getLogColor(log.level)} animate-in fade-in slide-in-from-left-2 duration-300 leading-relaxed flex items-start gap-2`}
          >
            {log.level === "crypto" && <Coins className="w-3 h-3 mt-0.5 flex-shrink-0 text-green-400" />}
            <div className="flex-1">
              <span className="font-bold mr-2">[{log.level === "crypto" ? "CRYPTO" : log.level}]</span>
              <span className="text-green-400/80">{log.message}</span>
              {log.source && log.target && (
                <span className="ml-2 text-green-600 text-[10px]">
                  {log.source} → {log.target}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
